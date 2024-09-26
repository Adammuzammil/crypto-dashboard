"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

const MarketCap = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      const { data } = await axios.get("/api/coins");
      setCoins(data?.data?.coins);
    } catch (error) {
      console.log(error.message);
    }
  };

  function formatMarketCap(marketCap) {
    if (marketCap >= 1e9) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e9)}B`;
    } else if (marketCap >= 1e6) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e6)}M`;
    } else if (marketCap >= 1e3) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e3)}K`;
    } else {
      return new Intl.NumberFormat("en-US").format(marketCap);
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Market Cap</CardTitle>
      </CardHeader>
      {coins?.slice(0, 7).map((coin, i) => (
        <CardContent key={i}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={coin?.iconUrl} alt="logo" className="h-7 w-7" />
              <span>{coin?.name}</span>
            </div>
            <p>${formatMarketCap(coin?.marketCap)}</p>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default MarketCap;
