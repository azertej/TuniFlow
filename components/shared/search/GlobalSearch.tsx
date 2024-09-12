import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="relative max-w-[600px] w-full max-lg:hidden">
      <div className="background-light800_darkgradient flex min-h-[50px] rounded-lg items-center">
        <Image src='/assets/icons/search.svg' width={20} height={20} alt='searchIcon' className="cursor-pointer ml-3" />
        <Input placeholder="Search .." 
        className="border-none outline-none no-focus shadow-none mx-2 dark:text-white text-md dark:bg-slate-800 " />
      </div>
    </div>
  );
};

export default GlobalSearch;
