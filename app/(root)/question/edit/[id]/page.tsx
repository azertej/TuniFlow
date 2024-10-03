import QuestionsForm from "@/components/forms/QuestionsForm";
import { findUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { getQuestionById } from "@/lib/actions/question.action";

const EdiQuestion = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({questionId: params.id})
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await findUserById({ userId });
 
  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-3xl font-bold text-dark100_light900">
        Edit Question
      </span>
      <QuestionsForm clerkUserId={JSON.stringify(mongoUser.clerkId)} questionInfos={JSON.stringify(question)} buttonType="edit" />
    </div>
  );
};

export default EdiQuestion;
