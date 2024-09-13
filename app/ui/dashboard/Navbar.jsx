"use client";

import React, { useState } from "react";
import { MdNotifications, MdPublic } from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

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
    <nav className="flex justify-between items-center bg-gray-800 p-4 mt-2 mx-4 rounded-lg">
      <div>
        <h1 className="text-xl md:text-2xl text-white capitalize font-mont">
          Okaeri, {getNameBeforeAt(user?.email)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <MdNotifications size={20} className="text-white" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Language"
        >
          <MdPublic size={20} className="text-white" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-white" />
          ) : (
            <Moon size={20} className="text-white" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
