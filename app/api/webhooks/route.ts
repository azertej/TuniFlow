/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  // Log event data for debugging
  console.log("Event Data:", evt.data);

  const { id, username, first_name, last_name, image_url, email_addresses } = evt.data;

  if (!id || !username || !first_name || !email_addresses || email_addresses.length === 0) {
    return new Response("Missing required fields", { status: 400 });
  }

  const name = `${first_name} ${last_name || ""}`;
  const email = email_addresses[0].email_address;
  const userPic = image_url || "https://example.com/default-user-pic.jpg"; // Fallback for missing image

  if (eventType === "user.created") {
    try {
      const mongoUser = await createUser({
        clerkId: id,
        name,
        userName: username,
        email,
        userPic,
      });
      return NextResponse.json({ message: "User created", user: mongoUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    try {
      const updatedMongoUser = await updateUser({
        clerkId: id,
        updatedData: { name, userName: username, email, userPic },
        path: `/profile/${id}`,
      });
      return NextResponse.json({ message: "User updated", user: updatedMongoUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const deleteMongoUser = await deleteUser({ clerkId: id });
      return NextResponse.json({ message: "User deleted", user: deleteMongoUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Unhandled event type", { status: 400 });
}