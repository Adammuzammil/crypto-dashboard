import Link from "next/link";
import React from "react";
import { LuRadar } from "react-icons/lu";

const Logo = () => {
  return (
    <>
      <Link
        href="/dashboard"
        className="mb-6 text-center flex items-center justify-center lg:justify-start gap-2 p-4"
      >
        <img src="/cr.svg" alt="" />
      </Link>
    </>
  );
};

export default Logo;
