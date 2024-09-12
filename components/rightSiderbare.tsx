import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "./shared/Tags";

const questions = [
  { _id: '1', firstQuestion: "First Question ..." },
  { _id: '2', firstQuestion: "Second Question ..." },
  { _id: '3', firstQuestion: "Third Question ..." },
  { _id: '4', firstQuestion: "Fourth Question ..." },
  { _id: '5', firstQuestion: "FIfth Question ..." },
];
const tags = [
  { _id: "1", tagName: "React", totalTags: 4 },
  { _id: "2", tagName: "JavaScript", totalTags: 3 },
  { _id: "3", tagName: "NextJS", totalTags: 5 },
  { _id: "4", tagName: "html", totalTags: 1 },
  { _id: "5", tagName: "php", totalTags: 4 },
];
const RightSiderbare = () => {
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
                  href={`/question/${question._id}`}
                  className="flex justify-between py-2"
                >
                  <span className="dark:text-white">
                    {question.firstQuestion}{" "}
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
            {tags.map((tag) => {
              return (
                <Tags
                  _id={tag._id}
                  tagName={tag.tagName}
                  totalTgas={tag.totalTags}
                  isShowed
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSiderbare;
