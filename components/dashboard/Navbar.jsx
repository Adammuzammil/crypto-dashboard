"use client";

import React, { useState } from "react";
import { MdNotifications, MdPublic } from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  const userData = localStorage.getItem("userInfo");

  const user = JSON.parse(userData);
  const { setTheme, theme } = useTheme();

  function getNameBeforeAt(email) {
    const name = email?.split("@")[0];
    return name;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex w-full">
      <div className="mx-2 mt-2 self-center">
        <SidebarTrigger />
      </div>
      <nav className="flex-1 mt-2 mx-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center p-4 rounded-lg shadow-md">
          <h1 className="text-xl md:text-2xl dark:text-white text-black font-medium capitalize font-mont">
            Okaeri, {getNameBeforeAt(user?.email)}
          </h1>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={20} className="dark:text-white text-black" />
              ) : (
                <Moon size={20} className="text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
