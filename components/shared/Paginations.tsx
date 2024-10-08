"use client";
import { handleFormQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface paginationProps {
  pageNumber: number;
  isNext: boolean;
}
const Paginations = ({ pageNumber, isNext }: paginationProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleNavigation = (direction: string) => {
    const nextPage = direction === "next" ? pageNumber + 1 : pageNumber - 1;
    const newURL = handleFormQuery({
      params:searchParams.toString(),
      key:'page',
      value: nextPage.toString()
    })
    router.push(newURL)
  };
  return (
    <div className="flex justify-center items-center gap-x-2 mt-8">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2  min-h-[25px] border flex justify-center items-center"
      >
        <span className="text-dark200_light800 text-md font-semibold">
          Prev
        </span>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center rounded-md px-2 py-[2px] ">
        <span className="text-light-900 text-md font-semibold">
          {pageNumber}{" "}
        </span>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2  min-h-[30px] border flex justify-center items-center"
      >
        <span className="text-dark200_light800 text-md font-semibold">
          Next
        </span>
      </Button>
    </div>
  );
};

export default Paginations;
