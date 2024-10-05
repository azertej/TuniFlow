"use client";
import { Input } from "@/components/ui/input";
import { handleFormQuery, removeKeysQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const patname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      if (search) {
        const newURL = handleFormQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newURL, { scroll: false });
      } else {
        if (patname === route) {
          const newURL = removeKeysQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 1000);
    return () => clearTimeout(debouncedFn);
  }, [search, route, router, patname, searchParams]);

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
