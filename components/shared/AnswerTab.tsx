import React from "react";
import { SearchParamsProps } from "@/types";
import { userAnswers } from "@/lib/actions/user.action";
import Link from "next/link";
import Image from "next/image";
import { convertTime } from "@/lib/utils";
import Votes from "./Votes";
import InerrHTML from "./InerrHTML";

interface answerProps extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}
const AnswerTab = async ({ userId, clerkId, searchParams }: answerProps) => {
  const userAnswer = await userAnswers({ userId });
  return (
    <>
      <div className="mt-5 flex flex-col gap-y-4">
        {userAnswer.answers.map((answer) => (
          <div key={answer._id} className="light-border border-b py-5">
            <div className="flex flex-col-reverse justify-between sm:flex-row my-5">
              <div className="flex flex-1 items-start gap-2 sm:items-center">
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
              </div>
              <div className="text-dark300_light700 flex gap-x-2 justify-end">
                <div className="flex items-center gap-x-1">
                    <Image src='/assets/icons/upvote.svg' width={20} height={20} alt='upvotePic' />
                    <span className="text-md text-dark400_light900 "> {answer.upVotes.length} </span>
                </div>
                <div className="flex items-center gap-x-1">
                    <Image src='/assets/icons/downvote.svg' width={20} height={20} alt='downvotePic' />
                    <span className="text-md text-dark400_light900 "> {answer.downVotes.length} </span>
                </div>
              </div>
            </div>
            <InerrHTML data={answer.content} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AnswerTab;
