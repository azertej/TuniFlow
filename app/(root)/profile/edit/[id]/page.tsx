import UsersForm from "@/components/forms/UsersForm";
import { findUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const EdiQuestion = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await findUserById({ userId });
 
  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-3xl font-bold text-dark100_light900">
        Edit User
      </span>
      <UsersForm clerkId={userId} user={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default EdiQuestion;
