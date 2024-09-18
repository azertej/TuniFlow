"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

interface localFilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClass: string;
  countainerClass?: string;
}

const LocalFilter = ({
  filters,
  otherClass,
  countainerClass,
}: localFilterProps) => {
  return (
    <div className={` relative ${countainerClass} `}>
      <Select>
        <SelectTrigger
          className={`${otherClass} background-light800_dark300 text-dark500_light700 w-[150px] max-sm:w-full `}
        >
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem value={filter.value} key={filter.value} className='text-dark500_light700 background-light800_dark300 '>
                {" "}
                {filter.name}{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocalFilter;
