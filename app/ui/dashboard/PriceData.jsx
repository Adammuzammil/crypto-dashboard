"use client";

import { useEffect, useState } from "react";

const PriceData = ({ name }) => {
  const id = name.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const [price, setPrice] = useState();

  useEffect(() => {
    const getPriceData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setPrice(data);
    };

    getPriceData();
  }, [name]);

  function formatCurrency(value, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  }

  return (
    <div className="bg-white rounded-lg shadow mt-6 p-8 px-6">
      <div className="flex gap-5 items-center">
        <img src={price?.image?.large} alt="" className="w-10 h-10" />
        <div className="">
          <h3 className="text-sm text-gray-400">
            {price?.symbol?.toUpperCase()}
          </h3>
          <h4 className="font-semibold">Price statistics</h4>
        </div>
      </div>
      <hr className="my-4" />

      <div className="flex flex-col justify-center gap-8">
        {/* Price Info */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Price</span>
          <span>{formatCurrency(price?.market_data?.current_price?.usd)}</span>
        </div>

        {/* Price Change */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Price change</span>
          <span>
            {Number(price?.market_data?.price_change_percentage_24h).toFixed(2)}
          </span>
        </div>

        {/* Rank  */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Market Cap Rank</span>
          <span>{price?.market_data?.market_cap_rank}</span>
        </div>

        {/* 24h high */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">24h High</span>
          <span>{formatCurrency(price?.market_data?.["high_24h"]?.usd)}</span>
        </div>

        {/* 24h low */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">24h Low</span>
          <span>{formatCurrency(price?.market_data?.["low_24h"]?.usd)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total volume</span>
          <span>{formatCurrency(price?.market_data?.total_volume?.usd)}</span>
        </div>

        {/* market cap */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Market cap</span>
          <span>{formatCurrency(price?.market_data?.market_cap?.usd)}</span>
        </div>

        {/* Supply */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Supply</span>
          <span>{price?.market_data?.max_supply}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceData;
