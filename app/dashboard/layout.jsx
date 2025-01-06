import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import Navbar from "../ui/dashboard/Navbar";
import { getSession } from "../../utils/getSession";
import Footer from "@/components/shared/Footer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";

const DashboardLayout = async ({ children }) => {
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

export default DashboardLayout;
