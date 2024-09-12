import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import { getSession } from "../../utils/getSession";
import Navbar from "../ui/dashboard/Navbar";
import Footer from "@/components/shared/Footer";

const TrendingLayout = async ({ children }) => {
  const details = await getSession();
  return (
    <div className="flex relative h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default TrendingLayout;
