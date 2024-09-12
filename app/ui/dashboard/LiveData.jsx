"use client";
import { payments } from "@/utils/demo";
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

const LiveData = () => {
  const [coins, setCoins] = useState();
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

  const getStatusClass = (status) => {
    return classNames({
      "text-blue-500": status === "processing",
      "text-yellow-500": status === "pending",
      "text-green-500": status === "completed",
      "text-red-500": status === "failed",
    });
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
    <div className="bg-white rounded-xl shadow-xl">
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
            <TableHead className="">Market Cap</TableHead>
            <TableHead className="">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins?.slice(0, 6)?.map((coin, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={coin?.iconUrl}
                    alt={coin.name}
                    className="w-7 h-7"
                  />
                  <div className="flex items-center gap-2">
                    <span> {coin.name}</span>
                    <span className="text-xs text-gray-400 ">
                      {coin?.symbol}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="">
                  <span
                    className={`text-xs flex items-center gap-1 ${
                      coin?.change.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {coin?.change.startsWith("-") ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {coin?.change || "N/A"}
                  </span>
                </span>
              </TableCell>
              <TableCell className="text-center">{coin?.price}</TableCell>
              <TableCell className="">{coin?.["24hVolume"]}</TableCell>
              <TableCell className="text-center">
                {formatMarketCap(coin?.marketCap)}
              </TableCell>
              <TableCell>
                <Sparklines data={coin?.sparkline}>
                  <SparklinesLine style={{ fill: "none" }} />
                  <SparklinesSpots />
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
