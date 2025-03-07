"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Logo = () => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Link href="/dashboard" className="block">
      <Image
        src="/kai.svg"
        alt="Kai Logo"
        width={32}
        height={32}
        className="size-8"
        priority
      />
    </Link>
  );
};

export default Logo;
