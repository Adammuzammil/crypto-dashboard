"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.path}
                className={`flex items-center justify-center py-3 my-1 rounded-md hover:px-2  hover:bg-gradient-to-br from-black to-gray-500 ${
                  pathname === item.path && "active"
                }`}
              >
                {item.icon}
                {/* <span>{item.title}</span> */}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default MenuLink;
