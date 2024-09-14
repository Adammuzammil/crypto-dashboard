import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import { getSession } from "../../utils/getSession";
import Footer from "@/components/shared/Footer";
import Navbar from "../ui/dashboard/Navbar";

const CoinsLayout = async ({ children }) => {
  return (
    <div className="flex relative h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black">
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default CoinsLayout;
