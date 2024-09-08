import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative background-light850_dark100">
      <Navbar />
      <div className="flex">
        RightSider
        <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-36 max-md:pb-14 max-sm:px-14">
          <div className="mx-auto max-w-5xl w-full">{children}</div>
        </section>
        leftSider
      </div>
    </main>
  );
};

export default Layout;
