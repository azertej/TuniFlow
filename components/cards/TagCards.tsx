import Link from "next/link";
import React from "react";
import Tags from "../shared/Tags";

interface tagProps {
  _id: string;
  name: string;
  description: string;
  questionRef: string[];
}

const TagCards = ({ tag }: tagProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone bg-slate-100 rounded-2xl"
    >
      <div className="dark:bg-slate-900 border light-border flex flex-col justify-center items-start gap-y-5 p-5 rounded-2xl max-sm:w-full">
        <Tags _id={tag._id} tagName={tag.name} />
        <span className="min-h-40 max-sm:min-h-28 text-sm dark:text-white">{tag.description} </span>
        <div className="flex gap-x-1">
           <span className="text-primary-500">{tag.questionRef.length > 1 ? `+${tag.questionRef.length}`:`${tag.questionRef.length}`} </span>
           <span className="dark:text-white">{tag.questionRef.length > 1 ? `questions`:`question`}</span>
        </div>
      </div>
    </Link>
  );
};

export default TagCards;
