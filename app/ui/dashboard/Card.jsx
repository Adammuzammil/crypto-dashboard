"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";

const DashCard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      const data = await axios.get("/api/coins");
      setCoins(data?.data?.data?.coins);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // console.log(coins);

  return (
    <>
      {coins?.slice(0, 4).map((coin, i) => (
        <CoinCard coin={coin} key={coin.id} />
      ))}
    </>
  );
};

export default DashCard;
