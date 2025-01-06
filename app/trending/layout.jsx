import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import { getSession } from "../../utils/getSession";
import Navbar from "../ui/dashboard/Navbar";
import Footer from "@/components/shared/Footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";

const TrendingLayout = async ({ children }) => {
  const details = await getSession();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <main className="">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TrendingLayout;
