import QuestionsForm from "@/components/forms/QuestionsForm";
import { findUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await findUserById({ userId });
  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-3xl font-bold text-dark100_light900">
        Ask a Question
      </span>
      <QuestionsForm clerkUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default AskQuestion;
