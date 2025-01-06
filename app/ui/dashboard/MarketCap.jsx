"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const MarketCap = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoins = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/coins");
      const data = await response.json();

      if (!data?.data?.coins) {
        throw new Error("Invalid data format received");
      }

      setCoins(data.data.coins);
    } catch (error) {
      setError(error.message || "Failed to fetch cryptocurrency data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);

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

  if (isLoading) {
    return (
      <Card className="shadow-md mt-4 animate-pulse">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded w-32" />
        </CardHeader>
        {[...Array(7)].map((_, i) => (
          <CardContent key={i} className="border-b last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gray-200" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </CardContent>
        ))}
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
    <Card className="shadow-md mt-4 bg-card">
      <CardHeader className="pb-6">
        <CardTitle className="mt-2 text-xl md:text-2xl font-bold">
          Market Cap Rankings
        </CardTitle>
      </CardHeader>
      <div className="divide-y divide-border">
        {coins?.slice(0, 7).map((coin, index) => (
          <CardContent
            key={coin.id || index}
            className="py-3.5 last:pb-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={coin?.iconUrl}
                    alt={`${coin?.name} logo`}
                    className="h-8 w-8 object-contain"
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                  <span className="absolute top-1/2 -left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground ml-1">
                    {index + 1}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{coin?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {coin?.symbol}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    ${formatMarketCap(coin?.marketCap)}
                  </span>
                  {coin?.change && (
                    <span
                      className={`text-sm ${
                        parseFloat(coin.change) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {parseFloat(coin.change) >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
                {coin?.change && (
                  <span
                    className={`text-xs ${
                      parseFloat(coin.change) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {parseFloat(coin.change) >= 0 ? "+" : ""}
                    {coin.change}%
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        ))}
      </div>
    </Card>
  );
};

export default MarketCap;
