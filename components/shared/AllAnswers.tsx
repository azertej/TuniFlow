import { AnswerFilters } from "@/constants/filters";
import { getAllAnswers } from "@/lib/actions/answer.action";
import { convertTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocalFilter from "./LocalFilter";
import InerrHTML from "./InerrHTML";
import Votes from "./Votes";
import Paginations from "./Paginations";
interface answerProps {
  questionId: string;
  authorId: string;
  answersLength: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  authorId,
  answersLength,
  page,
  filter,
}: answerProps) => {
  const questionAnswers = await getAllAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <span className="primary-text-gradient">
            {answersLength} Answers{" "}
          </span>
          <LocalFilter filters={AnswerFilters} />
        </div>
        <div className="mt-5 flex flex-col gap-y-4">
          {questionAnswers.answers.map((answer) => (
            <div key={answer._id} className="light-border border-b py-5">
              <div className="flex flex-col-reverse justify-between sm:flex-row my-5">
                <Link
                  href={`/profile/${answer.answerAuthor.clerkId}`}
                  className="flex flex-1 items-start gap-2 sm:items-center"
                >
                  <Image
                    src={answer.answerAuthor.userPic}
                    width={20}
                    height={20}
                    alt="userPic"
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col sm:flex-row sm:gap-x-2 sm:items-center">
                    <span className="font-semibold text-dark300_light700">
                      {answer.answerAuthor.name}{" "}
                    </span>
                    <span className="text-sm text-light400_light500 line-clamp-1">
                      {" "}
                      answred {convertTime(answer.createdAt)}{" "}
                    </span>
                  </div>
                </Link>
                <div className="text-dark300_light700 flex justify-end">
                  <Votes
                    type="answer"
                    currentUser={JSON.parse(authorId)}
                    questionRef={answer._id}
                    upvotes={answer.upVotes.length}
                    hasUpvoted={answer.upVotes.includes(JSON.parse(authorId))}
                    downVotes={answer.downVotes.length}
                    hasDownvoted={answer.downVotes.includes(
                      JSON.parse(authorId)
                    )}
                  />
                </div>
              </div>
              <InerrHTML data={answer.content} />
            </div>
          ))}
        </div>
      </div>
      <Paginations
        pageNumber={page ? +page : 1}
        isNext={questionAnswers.isNext}
      />
    </>
  );
};

export default AllAnswers;
