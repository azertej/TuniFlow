import HomeFilters from "@/components/home/homeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalFilter from "@/components/shared/LocalFilter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import QuestionCards from "@/components/cards/QuestionCards";

const questions = [
  {
    _id: "1",
    title: "What is the best electric car in 2024?",
    tags: [
      { _id: '1', name: "Electric" },
      { _id: '2', name: "Car" },
      { _id: '3', name: "2024" },
    ],
    auther: {
      _id: "abc123",
      name: "John Doe",
      autherImg: "https://example.com/johndoe.jpg",
    },
    votes: 32,
    views: 256,
    answers: [],
    created: new Date("2024-09-01T12:34:00"),
  },
  {
    _id: "2",
    title: "Is the BMW i4 better than the Tesla Model 3?",
    tags: [
      { _id: 4, name: "BMW" },
      { _id: 5, name: "Tesla" },
      { _id: 6, name: "Comparison" },
    ],
    auther: {
      _id: "def456",
      name: "Jane Smith",
      autherImg: "https://example.com/janesmith.jpg",
    },
    votes: 54,
    views: 1024,
    answers: [
      {
        _id: "uvw123",
        answer: "Tesla is better for the long run.",
        votes: 20,
        accepted: true,
      },
    ],
    created: new Date("2024-09-05T09:12:00"),
  },
  {
    _id: "3",
    title: "Is the BMW i4 better than the Tesla Model 3?",
    tags: [
      { _id: 4, name: "BMW" },
      { _id: 5, name: "Tesla" },
      { _id: 6, name: "Comparison" },
    ],
    auther: {
      _id: "def456",
      name: "Jane Smith",
      autherImg: "https://example.com/janesmith.jpg",
    },
    votes: 54,
    views: 1024,
    answers: [
      {
        _id: "uvw123",
        answer: "Tesla is better for the long run.",
        votes: 20,
        accepted: true,
      },
    ],
    created: new Date("2024-09-05T09:12:00"),
  },
];

const Home = () => {
  return (
    <div className="flex flex-col">
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
      {questions.length > 0 ? (
        <div className="flex flex-col gap-y-5 mt-10">
          {questions.map((question) => (
            <QuestionCards
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              auther={question.auther}
              votes={question.votes}
              views={question.views}
              answers={question.answers}
              created={question.created}
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
    </div>
  );
};

export default Home;
