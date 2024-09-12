"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="flex justify-center gap-x-6 max-md:hidden mt-5">
      {HomePageFilters.map((filter) => (
        <Button
          className={`${active === filter.value ? "text-primary-500 bg-slate-300" : "bg-light-800 text-light-500"}  dark:bg-slate-900 `}
          key={filter.value}
          onClick={() => {}}
        >
          {" "}
          {filter.name}{" "}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
