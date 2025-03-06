"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  TrendingUp,
  PieChart,
  Activity,
  DollarSign,
  AlertCircle,
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingDown,
  RefreshCcw,
} from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { btcToUsd, convertBTCtoUSD } from "@/utils/btcConverter";
import { Button } from "../ui/button";

const GlobalStats = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchGlobalStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const data = await response.json();

      if (!data?.data) {
        throw new Error("No data available.");
      }

      setStats(data?.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num?.toFixed(2);
  };

  if (isLoading) {
    return (
      <Card className="shadow-md mt-4 animate-pulse">
        <CardHeader>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        </CardHeader>
        {[...Array(4)].map((_, i) => (
          <CardContent key={i} className="border-b last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </CardContent>
        ))}
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4 flex flex-col items-center">
        <AlertCircle className="h-6 w-6 text-red-500 mb-2" />
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
    );
  }

  const marketCapChange = stats?.market_cap_change_percentage_24h_usd ?? 0;
  const isPositiveChange = marketCapChange >= 0;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg border-b">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 px-4 py-2 min-w-max">
          <div className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Coins:{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {stats?.active_cryptocurrencies}
            </span>
          </div>

          <div className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Exchanges:{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {stats?.markets}
            </span>
          </div>

          <div className="text-gray-600 dark:text-gray-400 whitespace-nowrap flex items-center gap-2">
            Market Cap:{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              ${formatNumber(btcToUsd(stats?.total_market_cap?.btc))}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                isPositiveChange
                  ? " text-green-700  dark:text-green-400"
                  : " text-red-700 dark:text-red-400"
              }`}
            >
              {isPositiveChange ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositiveChange ? "+" : ""}
              {marketCapChange.toFixed(1)}%
            </span>
          </div>

          <div className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
            24h Volume:{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              ${formatNumber(btcToUsd(stats?.total_volume?.btc))}
            </span>
          </div>

          <div className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Dominance:{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              BTC {stats?.market_cap_percentage?.btc?.toFixed(1)}%
            </span>{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              ETH {stats?.market_cap_percentage?.eth?.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
