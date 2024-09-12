"use client";
import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./BreadCrumbs";
import InfoCard from "./InfoCard";
import CoinChart from "./CoinChart";
import PriceData from "./PriceData";
import CointextInfo from "./CointextInfo";
import OtherInfo from "./OtherInfo";

const SingleCoin = ({ data }) => {
  const [coin, setCoin] = useState(data?.data?.coin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coin) {
      setLoading(false);
    }
  }, [coin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function formatCurrency(value, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  }
  return (
    <div className="container mx-auto my-6">
      <div className="flex items-center cursor-pointer py-4">
        <BreadCrumbs coin={coin} />
      </div>

      {/* Coin header */}
      <div>
        <div>
          <div className="flex gap-5 items-center">
            <img
              src={coin?.iconUrl}
              alt={coin?.name}
              className="h-12 w-12 self-start"
            />
            <div className="flex flex-col gap-6 justify-between py-2">
              <h2 className="text-lg font-bold">
                {coin?.name}
                <sup className="p-1 text-gray-400">#{coin?.rank}</sup>
              </h2>

              <div>
                <span className="text-3xl font-semibold relative">
                  {formatCurrency(coin?.price)}
                  <span
                    className={`absolute -top-2 -right-14 ml-1 text-xs flex items-center gap-1 ${
                      coin?.change.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {coin?.change.startsWith("-") ? (
                      <TrendingDown className="inline-block w-4 h-4  text-red-500" />
                    ) : (
                      <TrendingUp className="inline-block w-4 h-4 text-green-500" />
                    )}
                    {coin?.change || "N/A"}%
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="my-4">
            <h2 className="text-sm py-2">Tags</h2>
            <div className="flex items-center gap-2 my-2">
              {coin?.tags?.map((tag, i) => (
                <div key={i}>
                  <span className="bg-gray-300 text-black rounded-2xl p-1 px-3">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coin Info */}

          <div className="grid gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5">
            <InfoCard
              title="Market cap"
              value={coin?.marketCap}
              change={coin?.change}
            />
            <InfoCard
              title="Fully diluted valuation"
              value={coin?.fullyDilutedMarketCap}
              change={coin?.change}
            />
            <InfoCard
              title="24 Hour Trading Vol"
              value={coin?.["24hVolume"]}
              change={coin?.change}
            />
            <InfoCard
              title="Circulating supply"
              value={coin?.supply?.circulating}
              type="number"
              symbol={coin?.symbol.toUpperCase()}
              change={coin?.change}
            />
          </div>

          {/* Coin Chart */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pb-6">
            <div className="lg:col-span-2">
              <CoinChart name={coin?.name} />
            </div>
            <div>
              <PriceData name={coin?.name} />
            </div>
          </div>

          {/* Coin textInfo */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 pb-6">
            <div className="lg:col-span-2">
              <CointextInfo name={coin?.name} />
            </div>
            <div className="lg:col-span-2">
              <OtherInfo name={coin?.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCoin;
