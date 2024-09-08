import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between gap-5 w-full background-light900_dark200 fixed z-50 p-6 shadow-light-300 dark:shadow-none sm:px-12">
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
      <p className="text-white">Search</p>
      <div className="flex-between gap-5">
        Theme
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
