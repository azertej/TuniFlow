
import LeftSiderbare from "@/components/LeftSiderbare";
import RightSiderbare from "@/components/rightSiderbare";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative background-light850_dark100">
      <Navbar />
      <div className="flex">
      <LeftSiderbare />
        <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-36 max-md:pb-14 max-sm:px-14">
          <div className="mx-auto max-w-5xl w-full">{children}</div>
        </section>
        <RightSiderbare />
      </div>
    </main>
  );
};

export default Layout;
