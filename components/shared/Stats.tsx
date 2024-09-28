import Image from "next/image";
import React from "react";

interface statsProps {
  totalQuestions: number;
  totalAnswers: number;
}

interface cardProps {
  img: string;
  title: string;
  nbr: number;
}
export const StatsCard = ({ img, title, nbr }: cardProps) => {
  return (
    <div className="w-[200px] max-md:min-w-[100px] max-md:min-h-[100px] flex flex-wrap items-center max-md:justify-center  light-border background-light900_dark300 gap-4 rounded-md border px-4 py-5 shadow-light-300 dark:shadow-dark-300">
      <Image src={img} width={40} height={50} alt="title" />
      <div className="flex flex-col">
        <span className="text-dark200_light900 font-semibold">{title} </span>
        <span className="text-dark400_light700">{nbr} </span>
      </div>
    </div>
  );
};

const Stats = ({ totalQuestions, totalAnswers }: statsProps) => {
  return (
    <div className="mt-8">
      <span className="text-2xl font-semibold text-dark200_light900">
        Stats
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5">
        <div className="flex flex-wrap items-center justify-evenly light-border background-light900_dark300 gap-4 rounded-md border p-5 shadow-light-300 dark:shadow-dark-300 ">
          <div className="flex flex-col">
            <span className="text-dark200_light900 font-semibold">
              {totalQuestions}{" "}
            </span>
            <span className="text-dark400_light700">Questions</span>
          </div>
          <div className="flex flex-col">
            <span className="text-dark200_light900 font-semibold">
              {totalAnswers}{" "}
            </span>
            <span className="text-dark400_light700">Answers</span>
          </div>
        </div>
        <StatsCard
          img="/assets/icons/gold-medal.svg"
          title="Gold-medal"
          nbr={0}
        />
        <StatsCard
          img="/assets/icons/silver-medal.svg"
          title="Silver-medal"
          nbr={0}
        />
        <StatsCard
          img="/assets/icons/bronze-medal.svg"
          title="Bronze-medal"
          nbr={0}
        />
      </div>
    </div>
  );
};

export default Stats;
