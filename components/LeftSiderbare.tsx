"use client";
import { sidebarLinks } from "@/constants/index";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { UserRoundPen } from "lucide-react";

const LeftSiderbare = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className=" sticky left-0 top-0 h-screen lg:w-[350px] background-light900_dark200 light-border custom-scrollbar overflow-y-auto border-r shadow-light-300 dark:shadow-none pt-32 p-6 max-sm:hidden  ">
      <div className="flex flex-col gap-y-14 ">
        <div className="min-h-full ">
          {sidebarLinks.map((link) => {
            const isActiveUrl =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            if (link.route === "/profile") {
              if (userId) {
                link.route = `${link.route}/${userId}`;
              } else {
                return null;
              }
            }
            return (
              <div key={link.label}>
                <Link
                  href={link.route}
                  className={`${
                    isActiveUrl
                      ? "primary-gradient text-light-900 rounded-lg"
                      : "text-dark300_light900"
                  } flex gap-x-5 items-center justify-start p-4 `}
                >
                  <Image
                    src={link.imgURL}
                    width={20}
                    height={20}
                    alt={link.label}
                    className={`${isActiveUrl ? "" : "invert-colors"}`}
                  />
                  <span
                    className={`${isActiveUrl ? "font-semibold" : "font-sans"} max-lg:hidden`}
                  >
                    {link.label}{" "}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <SignedOut>
          <div className="flex flex-col gap-y-4">
            <Link href="/sign-in">
              <Button className="small-medium dark:text-white btn-secondary min-h-[40px] w-full shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  width={20}
                  height={20}
                  alt="signInLogo"
                  className="invert-colors lg:hidden"
                />
                <p className="max-lg:hidden">Sign-in</p>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="small-medium text-black dark:text-white btn-secondary min-h-[40px] w-full shadow-none  ">
                <UserRoundPen size={20} className="lg:hidden" />
                <p className="max-lg:hidden">Sign-up</p>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSiderbare;
