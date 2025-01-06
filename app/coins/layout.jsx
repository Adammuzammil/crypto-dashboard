import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import { getSession } from "../../utils/getSession";
import Footer from "@/components/shared/Footer";
import Navbar from "../ui/dashboard/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";

const CoinsLayout = async ({ children }) => {
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

export default CoinsLayout;
