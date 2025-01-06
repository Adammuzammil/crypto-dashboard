"use client";

import { ChevronFirst } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const CustomTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar}>
      <ChevronFirst />
    </button>
  );
};

export default CustomTrigger;
