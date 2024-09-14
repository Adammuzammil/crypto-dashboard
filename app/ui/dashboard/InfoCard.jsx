"use client";

import { Info, TrendingDown, TrendingUp } from "lucide-react";
import React, { useState } from "react";

const InfoCard = ({
  title,
  type = "currency",
  value,
  change,
  symbol = "$",
  currency = "USD",
  locale = "en-US",
  desc,
  subdesc,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  function formatValue(value, type, symbol, locale, currency) {
    if (type === "currency") {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(value);
    } else {
      return `${new Intl.NumberFormat(locale).format(value)} ${symbol}`;
    }
  }

  return (
    <div className="bg-white rounded p-6 flex flex-col gap-14 relative">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <div
          className="relative inline-flex"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-4 w-4 cursor-pointer" />
        </div>
      </div>

      {showInfo && (
        <div className="absolute right-5 top-10 mt-2 bg-gray-100 text-black text-xs rounded-lg p-4 px-6 z-10 w-full">
          <span className="inline-block pb-2 text-sm">{desc}</span>
          <span className="text-sm">{subdesc}</span>
        </div>
      )}

      <div className="pb-4">
        <p>{formatValue(value, type, symbol, locale, currency)}</p>
        <span className={`${change < 0 ? "text-red-500" : "text-green-500"}`}>
          {change < 0 ? (
            <TrendingDown className="inline-block w-4 h-4  text-red-500" />
          ) : (
            <TrendingUp className="inline-block w-4 h-4 text-green-500" />
          )}
          {change || "N/A"}%
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
