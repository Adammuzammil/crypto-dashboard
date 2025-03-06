import React from "react";
import { getSession } from "../../utils/getSession";
import Navbar from "../../components/dashboard/Navbar";
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
