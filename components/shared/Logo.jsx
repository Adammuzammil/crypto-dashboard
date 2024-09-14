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
      <Link
        href="/dashboard"
        className="mb-6 text-center flex items-center justify-center lg:justify-start gap-2 p-4"
      >
        {theme === "dark" ? (
          <img src="/cr.svg" alt="" />
        ) : (
          <img src="/cryptoradar.svg" alt="" />
        )}
      </Link>
    </>
  );
};

export default Logo;
