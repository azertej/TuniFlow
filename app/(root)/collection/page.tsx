import QuestionCards from "@/components/cards/QuestionCards";
import LocalFilter from "@/components/shared/LocalFilter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { getAllSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Community = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const questions = await getAllSavedQuestions({ clerkId: userId });
  return (
    <section className="flex flex-col gap-y-8">
      <span className="font-bold text-3xl text-dark100_light900 ">
        Saved Questions
      </span>
      <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-y-5">
        <LocalSearch
          placeholder="Search questions..."
          iconPosition="left"
          iconImage="/assets/icons/search.svg"
        />
        <LocalFilter filters={QuestionFilters} otherClass="min-h-[60px]" />
      </div>
      <section className="flex justify-center">
        {questions.questions.length > 0 ? (
          <div className="flex flex-col gap-y-5 mt-10 ">
            {questions.questions.map((question: any) => (
              <QuestionCards
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
        ) : (
          <NoResult
            title="There's no Saved Questions to show"
            description="Be the first User . Get Involved !"
            buttonTitle="Ask a question"
          />
        )}
      </section>
    </section>
  );
};

export default Community;
