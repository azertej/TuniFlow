import AnswersForm from "@/components/forms/AnswersForm";
import AllAnswers from "@/components/shared/AllAnswers";
import InerrHTML from "@/components/shared/InerrHTML";
import Metric from "@/components/shared/Metric";
import Tags from "@/components/shared/Tags";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { findUserById } from "@/lib/actions/user.action";
import { convertTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";


const QuestionPage = async ({ params ,searchParams }:any) => {
  const question = await getQuestionById({ questionId: params.questionId });
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await findUserById({ userId });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-x-2"
          >
            <Image
              src={question.author.userPic}
              width={20}
              height={20}
              alt="userPic"
              className="rounded-full"
            />
            <span className="text-dark300_light700 font-semibold text-sm ">
              {question.author.name}{" "}
            </span>
          </Link>
          <div className="flex justify-end ">
            <Votes
              type="question"
              currentUser={mongoUser._id}
              questionRef={question._id}
              upvotes={question.upVotes.length}
              hasUpvoted={question.upVotes.includes(mongoUser._id)}
              downVotes={question.downVotes.length}
              hasDownvoted={question.downVotes.includes(mongoUser._id)}
              hasSaved={mongoUser.savedPosts.includes(question._id)}
            />
          </div>
        </div>
        <span className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left ">
          {question.title}{" "}
        </span>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon="/assets/icons/clock.svg"
          alt="likeIcon"
          value={`Asked ${convertTime(question.createdAt)}`}
          title=""
          extraClass="small-medium text-dark400_light800"
        />
        <Metric
          icon="/assets/icons/message.svg"
          alt="messageIcon"
          value={question.answers.length}
          title="Answers"
          extraClass="small-medium text-dark400_light800"
        />
        <Metric
          icon="/assets/icons/eye.svg"
          alt="EyeIcon"
          value={question.views}
          title="Views"
          extraClass="small-medium text-dark400_light800"
        />
      </div>
      <InerrHTML data={question.explanation} />
      <div className="mt-5 flex gap-x-4 ">
        {question.tags.map((tag: any) => (
          <Tags key={tag._id} _id={tag._id} tagName={tag.name} />
        ))}
      </div>
      <AllAnswers
        questionId={params.questionId}
        authorId={JSON.stringify(mongoUser._id)}
        answersLength={question.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <div className="mt-10">
        <AnswersForm
          questionId={params.questionId}
          authorId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </>
  );
};

export default QuestionPage;
