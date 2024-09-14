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
  console.log(data);
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
              src={data?.image?.large}
              alt={data?.name}
              className="h-12 w-12 self-start"
            />
            <div className="flex flex-col gap-6 justify-between py-2">
              <h2 className="text-lg font-bold">
                {data?.name}
                <sup className="p-1 text-gray-400">
                  #{data?.market_cap_rank}
                </sup>
              </h2>

              <div>
                <span className="text-3xl font-semibold relative">
                  {formatCurrency(data?.market_data?.current_price?.usd)}
                  <span
                    className={`absolute -top-2 -right-20 ml-1 text-xs flex items-center gap-1 ${
                      data?.market_data?.price_change_percentage_1h_in_currency
                        ?.usd < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {data?.market_data?.price_change_percentage_1h_in_currency
                      ?.usd < 0 ? (
                      <TrendingDown className="inline-block w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingUp className="inline-block w-4 h-4 text-green-500" />
                    )}
                    {data?.market_data?.price_change_percentage_1h_in_currency
                      ?.usd !== undefined
                      ? `${data.market_data.price_change_percentage_1h_in_currency.usd}%`
                      : "N/A"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {/* <div className="my-4">
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
          </div> */}

          {/* Coin Info */}

          <div className="grid gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5">
            <InfoCard
              title="Market cap"
              value={data?.market_data?.market_cap?.usd}
              change={
                data?.market_data?.market_cap_change_percentage_24h_in_currency
                  ?.usd
              }
              desc="Market Cap = Current Price x Circulating Supply"
              subdesc={
                "Refers to the total market value of a cryptocurrency’s circulating supply. It is similar to the stock market’s measurement of multiplying price per share by shares readily available in the market (not held & locked by insiders, governments)"
              }
            />
            <InfoCard
              title="Fully diluted valuation"
              value={data?.market_data?.fully_diluted_valuation?.usd}
              change={coin?.change}
              desc={
                "Fully Diluted Valuation (FDV) = Current Price x Total Supply"
              }
              subdesc={
                "Fully Diluted Valuation (FDV) is the theoretical market capitalization of a coin if the entirety of its supply is in circulation, based on its current market price. The FDV value is theoretical as increasing the circulating supply of a coin may impact its market price. Also depending on the tokenomics, emission schedule or lock-up period of a coin's supply, it may take a significant time before its entire supply is released into circulation."
              }
            />
            {/* <InfoCard
              title="24 Hour Trading Vol"
              value={coin?.["24hVolume"]}
              change={coin?.change}
              desc={
                "A measure of a cryptocurrency trading volume across all tracked platforms in the last 24 hours. This is tracked on a rolling 24-hour basis with no open/closing times"
              }
            /> */}
            <InfoCard
              title="Circulating supply"
              value={data?.market_data?.circulating_supply}
              type="number"
              symbol={coin?.symbol.toUpperCase()}
              change={coin?.change}
              desc={
                "The amount of coins that are circulating in the market and are tradeable by the public. It is comparable to looking at shares readily available in the market (not held & locked by insiders, governments)."
              }
            />
          </div>

          {/* Coin Chart */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pb-6">
            <div className="lg:col-span-2">
              <CoinChart name={data?.name} />
            </div>
            <div>
              <PriceData name={data?.name} />
            </div>
          </div>

          {/* Coin textInfo */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 pb-6">
            <div className="lg:col-span-2">
              <CointextInfo name={data?.name} />
            </div>
            <div className="lg:col-span-2">
              <OtherInfo name={data?.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCoin;
