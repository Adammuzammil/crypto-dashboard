"use client";

import React, { useState } from "react";
import { MdNotifications, MdPublic } from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  function getNameBeforeAt(email) {
    const name = email?.split("@")[0];
    return name;
  }

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div>
        <h1 className="text-xl md:text-2xl text-white capitalize">
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
        >
          {isDarkMode ? (
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
