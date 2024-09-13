"use client";

import React, { useEffect, useState } from "react";
import Chart from "../ui/dashboard/Chart";
import { useRouter } from "next/navigation";
import DashCard from "../ui/dashboard/Card";
import MarketCap from "../ui/dashboard/MarketCap";
import LiveData from "../ui/dashboard/LiveData";
import { getAccessToken } from "@/utils/getAccessToken";
import { getUserInfo } from "@/utils/jwtDecode";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
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
