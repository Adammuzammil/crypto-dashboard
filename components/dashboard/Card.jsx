"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GlobalStats from "@/components/shared/GlobalStats";
import { Loader2 } from "lucide-react";

const DashCard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/coins");
      setCoins(data.coins);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error: {error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {coins?.slice(0, 4).map((coin, i) => (
        <CoinCard coin={coin} key={coin.id} />
      ))}
    </>
  );
};

export default DashCard;
