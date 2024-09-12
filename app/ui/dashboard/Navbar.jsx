"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdNotifications, MdPublic } from "react-icons/md";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ details }) => {
  const { user } = details;
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div>
        <h1 className="text-xl md:text-2xl text-white capitalize">
          Okaeri, {user.firstName}
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
