"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import Link from "next/link";
import Image from "next/image";

const LiveData = () => {
  const [coins, setCoins] = useState();
  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      const { data } = await axios.get("/api/coins");
      setCoins(data.coins);
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
    <div className="bg-white rounded-xl shadow-xl dark:bg-gray-800">
      <div className="p-4">
        <h2 className="text-2xl mt-2">Latest Market</h2>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">Cryptocurrency</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="text-center">
              <Button variant="ghost">
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="">24h Volume</TableHead>
            <TableHead className="text-center">Market Cap</TableHead>
            <TableHead className="">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins?.slice(0, 6)?.map((coin, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={coin?.image}
                    alt={coin.name}
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />

                  <div className="flex items-center gap-2">
                    <span> {coin.name}</span>
                    <span className="text-xs text-gray-400 uppercase">
                      {coin?.symbol}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
                    coin?.price_change_percentage_24h < 0
                      ? "text-red-600 "
                      : "text-green-600 "
                  }`}
                >
                  {coin?.price_change_percentage_24h < 0 ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {coin?.current_price?.toLocaleString()}
              </TableCell>
              <TableCell className="">
                {coin?.total_volume?.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {formatMarketCap(coin?.market_cap)}
              </TableCell>
              <TableCell>
                <Sparklines data={coin?.sparkline_in_7d?.price}>
                  <SparklinesLine
                    style={{ strokeWidth: 2 }}
                    color={
                      coin?.price_change_percentage_24h < 0
                        ? "#dc2626"
                        : "#16a34a"
                    }
                  />
                </Sparklines>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-3 text-right">
        <Link href="/coins" className="text-sm text-blue-600">
          See More...
        </Link>
      </div>
    </div>
  );
};

export default LiveData;
