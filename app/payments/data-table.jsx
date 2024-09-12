"use client";
import { Moon, Sun } from "lucide-react";
import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label className="flex cursor-pointer select-none items-center ">
        <div className="relative flex items-center rotate-90">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-4 w-10 rounded-full duration-500  ${
              isChecked ? "bg-yellow-600" : "bg-[#E5E7EB]"
            } shadow-inner`}
          ></div>
          <div
            className={`dot absolute left-0 h-6 w-6 rounded-full bg-white transition-transform duration-500 ease-in-out flex items-center justify-center ${
              isChecked
                ? "transform translate-x-full"
                : "transform translate-x-0"
            } shadow-switch-1`}
          >
            {isChecked ? (
              <Sun size={14} className="text-yellow-500" />
            ) : (
              <Moon size={14} className="text-gray-400" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
