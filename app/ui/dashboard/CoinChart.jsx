"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleChart from "./SingleChart";

const CoinChart = ({ name }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("prices");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(1);
  console.log("Selected period", selectedTimeFrame);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const handleTimeFrameChange = (value) => {
    setSelectedTimeFrame(value);
  };

  return (
    <Card className="mt-6 border-0 shadow-lg">
      <CardContent className="p-4 md:p-6 lg:p-8">
        <CardTitle className="text-xl md:text-2xl font-bold text-center mb-8">
          Price Overview
        </CardTitle>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Tabs
            defaultValue="prices"
            className="w-auto"
            onValueChange={setSelectedPeriod}
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
              <TabsTrigger
                value="prices"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Price
              </TabsTrigger>
              <TabsTrigger
                value="market_caps"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Market Cap
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="1"
            className="w-auto"
            onValueChange={setSelectedTimeFrame}
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
              {[
                { value: "1", label: "24H" },
                { value: "7", label: "7D" },
                { value: "365", label: "1Y" },
              ].map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {label}
                </TabsTrigger>
              ))}
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
      </CardContent>
    </Card>
  );
};

export default CoinChart;
