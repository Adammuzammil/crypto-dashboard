"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import SingleChart from "./SingleChart";

const CoinChart = ({ name }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("prices");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(1);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const handleTimeFrameChange = (value) => {
    setSelectedTimeFrame(value);
  };

  return (
    <div className="mt-6 bg-white rounded">
      <div className="p-8">
        <h1 className="text-base md:text-xl font-semibold text-center">
          Overview
        </h1>

        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
          <Tabs
            defaultValue="prices"
            className="w-fit"
            onValueChange={handlePeriodChange}
          >
            <TabsList>
              <TabsTrigger value="prices">Price</TabsTrigger>
              <TabsTrigger value="market_caps">Market cap</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="1"
            className="w-fit"
            onValueChange={handleTimeFrameChange}
          >
            <TabsList>
              <TabsTrigger value="1">Day</TabsTrigger>
              <TabsTrigger value="7">Week</TabsTrigger>
              <TabsTrigger value="365">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6">
          <SingleChart
            name={name}
            selectedPeriod={selectedPeriod}
            selectedTimeFrame={selectedTimeFrame}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinChart;
