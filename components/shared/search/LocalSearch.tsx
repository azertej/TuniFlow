'use client'
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface LocalSearchProps {
  route?: string;
  placeholder: string;
  iconPosition: string;
  iconImage: string;
}

const LocalSearch = ({
  route,
  placeholder,
  iconPosition,
  iconImage,
}: LocalSearchProps) => {
  return (
    <div className="relative min-h-[30px] flex gap-x-3 items-center background-light800_darkgradient px-2 py-3 w-full rounded-lg">
      {iconPosition === "left" && (
        <Image
          src={iconImage}
          width={20}
          height={20}
          alt="searchIcon"
          className="mx-2 cursor-pointer"
        />
      )}
      <Input
        placeholder={placeholder}
        value=''
        onChange={()=>{}}
        className="border-none outline-none no-focus shadow-none mx-2 dark:text-white text-md  dark:bg-slate-800"
      />
      {iconPosition === "right" && (
        <Image
          src={iconImage}
          width={20}
          height={20}
          alt="searchIcon"
          className="mx-2 cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
