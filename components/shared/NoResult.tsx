import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface noResultProps {
  title: string;
  description: string;
  buttonTitle: string;
}

const NoResult = ({ title, description, buttonTitle }: noResultProps) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className=" relative w-[150px] h-[150px] block dark:hidden">
          <Image
            fill
            src="/assets/images/light-illustration.png"
            alt="lightIllustration"
          />
        </div>
        <div className=" relative w-[150px] h-[150px] hidden dark:flex">
          <Image
            src="/assets/images/dark-illustration.png"
            fill
            alt="lightIllustration"
          />
        </div>
        <span className="text-dark200_light900 font-bold text-2xl mt-2 ">
          {title}{" "}
        </span>
        <span className="text-dark500_light700 text-start max-w-[400px]"> {description} </span>
        <Link href="/ask-question">
          <Button className="bg-primary-500 text-light-900 mt-5 font-semibold p-5 ">{buttonTitle}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoResult;
