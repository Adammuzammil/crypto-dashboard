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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnalyticsChart from "./AnalyticsChart";

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

const Chart = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const triggerRef = useRef(null);

  const handleCoinChange = (value) => {
    const coin = coins.find((c) => c.name === value);
    setSelectedCoin(coin);
    // console.log(coin);
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

  const getCoinsData = async () => {
    try {
      const response = await axios.get("/api/coins");
      const fetchedCoins = response?.data?.data?.coins;
      setCoins(fetchedCoins);
      if (fetchedCoins && fetchedCoins.length > 0) {
        setSelectedCoin(fetchedCoins[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-[450px] bg-gray-800 p-5 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-1 mt-2">
          <div>
            <h2 className=" text-white text-2xl mb-2">Analytics</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Tabs
              defaultValue="24h"
              className="w-fit"
              onValueChange={handlePeriodChange}
            >
              <TabsList>
                <TabsTrigger value="24h">Day</TabsTrigger>
                <TabsTrigger value="7d">Week</TabsTrigger>
                <TabsTrigger value="30d">Month</TabsTrigger>
                <TabsTrigger value="1y">Year</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select onValueChange={handleCoinChange}>
              <SelectTrigger className="w-32" ref={triggerRef}>
                <SelectValue placeholder="Bitcoin" />
              </SelectTrigger>
              <SelectContent className="h-[200px] overflow-y-auto w-32 max-w-[90vw]">
                {coins?.map((coin) => (
                  <SelectItem key={coin.id} value={coin.name}>
                    <div className="flex items-center gap-2">
                      <img src={coin?.iconUrl} alt="" className="h-5 w-5" />
                      <span className="truncate">{coin.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col w-full md:pl-5 md:mt-3">
          {selectedCoin && (
            <AnalyticsChart
              coin={selectedCoin}
              selectedPeriod={selectedPeriod}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
