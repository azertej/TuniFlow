import React from "react";
import { SearchParamsProps } from "@/types";
import { userQuestions } from "@/lib/actions/user.action";
import QuestionCards from "../cards/QuestionCards";

interface questionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}
const QuestionTab = async ({
  userId,
  clerkId,
  searchParams,
}: questionTabProps) => {
  const userQuestion = await userQuestions({ userId });
  return (
    <>
      <div className="mt-5 flex flex-col gap-y-5 ">
        {userQuestion.questions.map((question) => (
          <QuestionCards
          clerkId={clerkId}
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            auther={question.author}
            votes={question.upVotes}
            views={question.views}
            answers={question.answers}
            created={question.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionTab;
