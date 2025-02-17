"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { LuRadar } from "react-icons/lu";

const Logo = () => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <>
      <Link href="/dashboard" className="block">
        {theme === "dark" ? (
          <img src="/kai.svg" alt="" className="size-8" />
        ) : (
          <img src="/kai.svg" alt="" className="h-8 w-8" />
        )}
      </Link>
    </>
  );
};

export default Logo;
