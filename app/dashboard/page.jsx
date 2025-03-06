"use client";

import React, { useEffect, useState } from "react";
import Chart from "../../components/dashboard/Chart";
import DashCard from "../../components/dashboard/Card";
import MarketCap from "../../components/dashboard/MarketCap";
import LiveData from "../../components/dashboard/LiveData";
import GlobalStats from "@/components/shared/GlobalStats";

const Dashboard = () => {
  return (
    <div className=" p-4 px-6 container mx-auto">
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 lg:col-span-4">
            <GlobalStats />
          </div>
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
