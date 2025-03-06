"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleChart from "./SingleChart";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TIME_PERIODS = [
  { value: "1", label: "24H" },
  { value: "7", label: "7D" },
  { value: "30", label: "1M" },
  { value: "365", label: "1Y" },
];

const Chart = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setCoins(data);
      } catch (error) {
        setError("Failed to fetch cryptocurrency data.", error);
      }
    };

    getCoinsData();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mt-4 border bg-card">
      <CardContent className="p-4 md:p-6 lg:p-8">
        <CardTitle className="text-xl md:text-2xl font-bold text-center mb-8 text-card-foreground">
          Price Overview
        </CardTitle>

        {/* Coin & Time Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Coin Selector */}
          <Select onValueChange={setSelectedCoin} defaultValue="bitcoin">
            <SelectTrigger className="w-40 bg-background">
              <SelectValue placeholder="Select Coin" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-auto">
              {coins.map((coin) => (
                <SelectItem
                  key={coin.id}
                  value={coin.id}
                  className="cursor-pointer hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                    />
                    <span className="truncate">{coin.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Timeframe Selector */}
          <Tabs
            defaultValue="7"
            onValueChange={setSelectedTimeFrame}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:flex bg-muted">
              {TIME_PERIODS.map(({ value, label }) => (
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

        {/* Chart Component */}
        <div className="mt-6 h-[400px]">
          <SingleChart
            id={selectedCoin}
            selectedPeriod="prices"
            selectedTimeFrame={selectedTimeFrame}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
