import React from "react";
import Card from "../ui/dashboard/Card";
import Transactions from "../ui/dashboard/Transactions";
import Chart from "../ui/dashboard/Chart";
import Rightbar from "../ui/dashboard/Rightbar";
import { getSession } from "../../utils/getSession";
import { redirect } from "next/navigation";
import DashCard from "../ui/dashboard/Card";
import Testing from "../ui/dashboard/Testing";
import MarketCap from "../ui/dashboard/MarketCap";
import LiveData from "../ui/dashboard/LiveData";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Chart />
          </div>
          <div className="hidden lg:block">
            <MarketCap />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <LiveData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
