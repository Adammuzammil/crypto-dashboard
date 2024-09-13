import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import Navbar from "../ui/dashboard/Navbar";
import { getSession } from "../../utils/getSession";
import Footer from "@/components/shared/Footer";

const DashboardLayout = async ({ children }) => {
  return (
    <>
      <div className="flex relative h-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Navbar />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
