import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalFilter from "@/components/shared/LocalFilter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import QuestionCards from "@/components/cards/QuestionCards";
import { getQuestions } from "@/lib/actions/question.action";

const Home = async () => {
  const result = await getQuestions({})
  return (
    <section className="flex flex-col">
      <div className="w-full flex sm:flex-row justify-between flex-col-reverse gap-y-4 ">
        <span className="font-bold text-3xl text-dark100_light900 ">
          All Questions
        </span>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="min-h-[40px] p-6 primary-gradient !text-light-900 ">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-y-6 mt-10">
        <LocalSearch
          route="/"
          placeholder="Search questions..."
          iconPosition="left"
          iconImage="/assets/icons/search.svg"
        />
        <LocalFilter
          filters={HomePageFilters}
          otherClass="min-h-[60px] "
          countainerClass="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      {result.questions.length > 0 ? (
        <div className="flex flex-col gap-y-5 mt-10">
          {result.questions.map((question) => (
            <QuestionCards
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              auther={question.author}
              votes={question.votes}
              views={question.views}
              answers={question.answers}
              created={question.createdAt}
            />
          ))}
        </div>
      ) : (
        <NoResult
          title="There's no question to show"
          description="Be the first to add a question . Get Involved !"
          buttonTitle="Ask a Question"
        />
      )}
    </section>
  );
};

export default Home;
