import { topQuestions } from "@/lib/actions/question.action";
import { topTags } from "@/lib/actions/tags.action";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "./shared/Tags";

const RightSiderbare = async () => {
  const questions = await topQuestions();
  const tags = await topTags();
  return (
    <section className=" sticky right-0 top-0 h-screen w-[350px] background-light900_dark200 light-border custom-scrollbar overflow-y-auto border-l shadow-light-300 dark:shadow-none max-xl:hidden  pt-32 p-6 ">
      <div className="flex flex-col">
        <div>
          <span className="text-2xl font-bold dark:text-slate-200">
            Top Questions
          </span>
          <div className="flex flex-col gap-y-3 mt-3">
            {questions.map((question) => {
              return (
                <Link
                  key={question._id}
                  href={`/question/${question._id}`}
                  className="flex justify-between items-center py-2"
                >
                  <span className="dark:text-white line-clamp-1">
                    {question.title}
                  </span>
                  <Image
                    src="/assets/icons/chevron-right.svg"
                    width={20}
                    height={20}
                    alt="chevronIcon"
                    className="invert-colors"
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold dark:text-slate-200">
            Popular Tags
          </span>
          <div className="flex flex-col gap-y-3 mt-3">
            {tags.map((tag:any)=>(
              <Tags key={tag._id} _id={tag._id} tagName={tag.name} totalTgas={tag.numberOfQuestions} isShowed />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSiderbare;
