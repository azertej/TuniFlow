"use client";
import { answerDownVote, answerUpVote } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { savedPost } from "@/lib/actions/user.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface votesProps {
  type: string;
  currentUser: string;
  questionRef: string;
  upvotes: number;
  hasUpvoted: boolean;
  downVotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  currentUser,
  questionRef,
  upvotes,
  hasUpvoted,
  downVotes,
  hasDownvoted,
  hasSaved,
}: votesProps) => {
  const pathname = usePathname();

  const handleSave = async () => {
    await savedPost({
      userId: currentUser,
      questionId: questionRef,
      path: pathname,
    });
    return;
  };

  const handleVote = async (action: string) => {
    if (!currentUser) {
      return;
    }
    if (action === "upVote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: questionRef,
          userId: currentUser,
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await answerUpVote({
          answerId: questionRef,
          userId: currentUser,
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
      }
      return;
    }
    if (action === "downVote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: questionRef,
          userId: currentUser,
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await answerDownVote({
          answerId: questionRef,
          userId: currentUser,
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
      }
      return;
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex gap-x-1">
        <div className="flex gap-x-1">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={20}
            height={20}
            alt="upVoteIcon"
            className="cursor-pointer"
            onClick={() => handleVote("upVote")}
          />
          <div className="background-light700_dark400 p-1 flex items-center">
            <span className="text-md text-dark400_light900 ">{upvotes} </span>
          </div>
        </div>
        <div className="flex gap-x-1">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={20}
            height={20}
            alt="downVoteIcon"
            className="cursor-pointer"
            onClick={() => handleVote("downVote")}
          />
          <div className="background-light700_dark400 p-1 flex items-center">
            <span className="text-md text-dark400_light900 ">{downVotes} </span>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={20}
          height={20}
          alt="saveIcon"
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;
