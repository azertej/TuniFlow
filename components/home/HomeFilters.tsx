"use client";
import { HomePageFilters } from "@/constants/filters";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { handleFormQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const router = useRouter()

  const handleFilterToggle = (item: string) => {
    if (active === item) {
      setActive("");
      const newURL = handleFormQuery({
        params:searchParams.toString(),
        key:'filter',
        value:null
      });
      router.push(newURL,{scroll:false})
    }else {
      setActive(item)
      const newURL = handleFormQuery({
        params:searchParams.toString(),
        key:'filter',
        value:item
      });
      router.push(newURL,{scroll:false})
    }
  };
  return (
    <div className="flex justify-center gap-x-6 max-md:hidden mt-5">
      {HomePageFilters.map((filter) => (
        <Button
          className={`${active === filter.value ? "text-primary-500 bg-slate-300" : "bg-light-800 text-light-500"}  dark:bg-slate-900 `}
          key={filter.value}
          onClick={() => handleFilterToggle(filter.value)}
        >
          {" "}
          {filter.name}{" "}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
