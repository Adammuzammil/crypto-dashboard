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
import { ArrowUpDown, Star, TrendingDown, TrendingUp } from "lucide-react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { Input } from "@/components/ui/input";
import AllCoins from "../ui/dashboard/AllCoins";

const Coins = () => {
  const [coins, setCoins] = useState();
  //   console.log(sortedData);

  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      const { data } = await axios.get("/api/coins?limit=10");
      setCoins(data?.data?.coins);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   const handleStarClick = () => {};

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-4xl font-semibold my-2 p-2">Crypto Coins</h1>

      <AllCoins coins={coins} />
    </div>
  );
};

export default Coins;
