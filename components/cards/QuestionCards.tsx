import { convertTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import Tags from "../shared/Tags";

interface questionCardsProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  auther: {
    _id: string;
    name: string;
    userPic: string;
  };
  votes: string[];
  views: number;
  answers: {
    _id: string;
    answer: string;
    votes: number;
    accepted: boolean;
  }[];
  created: Date;
}
const QuestionCards = ({
  _id,
  title,
  tags,
  auther,
  votes,
  views,
  answers,
  created,
}: questionCardsProps) => {
  return (
    <div
      className="card-wrapper rounded-lg p-5 flex flex-col gap-y-5 "
      key={_id}
    >
      <div className="flex flex-col gap-y-2">
        <span className="subtle-regular text-dark300_light700 line-clamp-1 flex sm:hidden">
          {convertTime(created)}
        </span>
        <Link href={`/question/${_id}`}>
          <span className="sm:h3-semibold base-semibold line-clamp-1 flex-1 text-dark200_light900">
            {title}
          </span>
        </Link>
      </div>
      <div className="flex gap-x-4">
        {tags.map((tag) => (
          <Tags key={tag._id} _id={tag._id} tagName={tag.name} />
        ))}
      </div>
      <div className="flex justify-between max-md:flex-col max-md:gap-y-3 ">
        <Metric
          icon={auther?.userPic}
          href={`profil/${auther?._id}`}
          auther
          alt="likeIcon"
          value={auther?.name}
          title={` - asked ${convertTime(created)}`}
          extraClass="text-dark400_light800"
        />
        <div className="flex gap-x-5">
          <Metric
            icon="/assets/icons/like.svg"
            alt="likeIcon"
            value={votes.length}
            title="Votes"
            extraClass="small-medium text-dark400_light800"
          />
          <Metric
            icon="/assets/icons/message.svg"
            alt="messageIcon"
            value={answers.length}
            title="Answers"
            extraClass="small-medium text-dark400_light800"
          />
          <Metric
            icon="/assets/icons/eye.svg"
            alt="EyeIcon"
            value={views}
            title="Views"
            extraClass="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCards;
