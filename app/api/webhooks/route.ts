/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  // Get the raw body as a readable stream and convert it to text
  const body = await req.text();

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  // Handle the event based on its type
  const eventType = evt?.type;
  if (eventType === "user.created") {
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evt.data;
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name || ""}`,  // Simplified
      userName: username!,
      email: email_addresses[0].email_address,
      userPic: image_url,
    });
    return NextResponse.json({ message: "Ok", user: mongoUser });
  }
  
  if (eventType === "user.updated") {
    const { id, username, first_name, last_name, image_url, email_addresses } =
      evt.data;
    const updatedMongoUser = await updateUser({
      clerkId: id,
      updatedData: {
        name: `${first_name} ${last_name || ""}`,  // Simplified
        userName: username!,
        email: email_addresses[0].email_address,
        userPic: image_url,
      },
      path: `/profile/${id}`,
    });
    return NextResponse.json({ message: "Ok", user: updatedMongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const deleteMongoUser = await deleteUser({ clerkId: id! });
    return NextResponse.json({ message: "Ok", user: deleteMongoUser });
  }

  return new Response("", { status: 200 });
}