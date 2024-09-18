import { popularUserTags } from "@/lib/actions/tags.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "../shared/Tags";
import { Badge } from "../ui/badge";

interface userProps {
  _id: string;
  clerkId: string;
  name: string;
  userName: string;
  userPic: string;
}

const UserCards = async ({ user }: userProps) => {
  const userTags = await popularUserTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-60 h-60 "
    >
      <div className="bg-slate-100 dark:bg-slate-900 border light-border flex flex-col justify-center items-center gap-y-3 p-8 rounded-2xl">
        <div className="relative min-w-28 h-28">
          <Image
            src={user.userPic}
            fill
            alt="userPic"
            className="rounded-full"
          />
        </div>
        <span className="font-bold text-dark500_light700">{user.name} </span>
        <span className="text-dark500_light500 text-sm">@{user.userName} </span>
        <section>
          {userTags && userTags.length > 0 ? (
            <div className="flex gap-x-5 justify-between">
              {userTags.map((tag) => (
                <Tags key={tag._id} _id={tag._id} tagName={tag.name} />
              ))}
            </div>
          ) : (
            <Badge className="p-2 text-gray-600 dark:bg-slate-800 dark:text-slate-400">No tags yet</Badge>
          )}
        </section>
      </div>
    </Link>
  );
};

export default UserCards;
