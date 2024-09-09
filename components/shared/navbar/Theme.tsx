"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useTheme } from "@/context/themeProvider";
import { themes } from "@/constants/index";
import Image from "next/image";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className=" focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 ">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              width={24}
              height={24}
              alt="sunIcon"
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={24}
              height={24}
              alt="monIcon"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-30px] min-w-[120px] bg-light-900 dark:bg-dark-200 ">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="flex gap-4 p-2 dark:focus:bg-dark-300"
              onClick={() => {
                setMode(theme.value);
                if (mode !== "system") {
                  localStorage.theme = theme.value
                } else {
                  localStorage.removeItem("theme")
                }
              }}
            >
              <Image
                src={theme.icon}
                width={16}
                height={16}
                alt={theme.value}
                className={`${mode === theme.value && "active-theme"}`}
              />
              <p
                className={` ${mode === theme.value ? "text-primary-500" : "text-dark100_light900"}`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
