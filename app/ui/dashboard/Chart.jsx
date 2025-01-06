"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AlertCircle, ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnalyticsChart from "./AnalyticsChart";
import SingleChart from "./SingleChart";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const data = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];

const TIME_PERIODS = [
  { value: "1", label: "Day" },
  { value: "7", label: "Week" },
  { value: "30", label: "Month" },
  { value: "365", label: "Year" },
];

const Chart = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const triggerRef = useRef(null);
  console.log(selectedCoin);

  const handleCoinChange = (value) => {
    const coin = coins.find((c) => c.name === value);
    setSelectedCoin(coin);
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  if (data?.data?.data?.coins.length > 0) {
    setSelectedCoin(data.data.data.coins[0]);
  }
  useEffect(() => {
    getCoinsData();

    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const getCoinsData = useCallback(async () => {
    try {
      const response = await fetch("/api/coins");
      const data = await response.json();

      if (!data?.data?.coins) {
        throw new Error("Invalid data format received");
      }

      const fetchedCoins = data.data.coins;
      setCoins(fetchedCoins);
      setSelectedCoin(fetchedCoins[0]);
    } catch (error) {
      setError(error.message || "Failed to fetch cryptocurrency data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCoinsData();
  }, [getCoinsData]);

  if (isLoading) {
    return (
      <Card className="mt-4 animate-pulse">
        <CardContent className="p-4 md:p-6 lg:p-8">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8" />
          <div className="h-96 bg-gray-100 rounded" />
        </CardContent>
      </Card>
    );
  }

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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Select onValueChange={handleCoinChange}>
            <SelectTrigger className="w-40 bg-background" ref={triggerRef}>
              <SelectValue placeholder="Bitcoin" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] ">
              {coins?.map((coin) => (
                <SelectItem
                  key={coin.id}
                  value={coin.name}
                  className="cursor-pointer hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={coin?.iconUrl}
                      alt=""
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                    />
                    <span className="truncate">{coin.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs
            defaultValue="1"
            className="w-full sm:w-auto"
            onValueChange={handlePeriodChange}
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

        <div className="mt-6 h-[400px]">
          <SingleChart
            name={selectedCoin?.name}
            selectedPeriod="prices"
            selectedTimeFrame={selectedPeriod}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
