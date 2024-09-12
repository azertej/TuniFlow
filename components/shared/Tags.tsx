import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface tagProps {
  _id: string;
  tagName: string;
  totalTgas?: number;
  isShowed?: boolean;
}

const Tags = ({ _id, tagName, totalTgas, isShowed }: tagProps) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex justify-between items-center"
    >
      <Badge className="background-light800_dark300 text-light400_light500 py-2 px-3">
        {" "}
        {tagName}{" "}
      </Badge>
      {isShowed && <span className="font-semibold text-sm text-dark500_light700"> {totalTgas} </span>}
    </Link>
  );
};

export default Tags;
