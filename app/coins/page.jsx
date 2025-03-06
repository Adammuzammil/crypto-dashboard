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
import AllCoins from "../../components/dashboard/AllCoins";

const Coins = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/coins");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto my-6">
      <AllCoins coins={cryptoData} />
    </div>
  );
};

export default Coins;
