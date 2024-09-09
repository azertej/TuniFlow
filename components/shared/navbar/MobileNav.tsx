"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants/index";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <section className="h-full flex flex-col gap-y-3 py-10">
      {sidebarLinks.map((link) => {
        const isActiveUrl =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose asChild key={link.label}>
            <Link
              href={link.route}
              className={`${
                isActiveUrl
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900"
              } flex gap-x-5 items-center justify-start p-4`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
                className={`${isActiveUrl ? '':'invert-colors'}`}
              />
              <span className={`${isActiveUrl ? 'font-semibold':'font-sans'}`}>{link.label} </span>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify size={36} className="cursor-pointer text-black dark:text-white sm:hidden " />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark300 border-none"
      >
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={24}
            height={24}
            alt="TuniFlowImage"
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden ">
            Tuni <span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild className="min-h-full">
            <NavItems />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-y-3">
                <Link href="/sign-in">
                  <Button className="small-medium dark:text-white btn-secondary min-h-[40px] w-full shadow-none">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="small-medium dark:text-white btn-secondary min-h-[40px] w-full shadow-none">
                    Sign Up
                  </Button>
                </Link>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
