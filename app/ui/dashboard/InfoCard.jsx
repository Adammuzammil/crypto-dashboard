import { Info, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const InfoCard = ({
  title,
  type = "currency",
  value,
  change,
  symbol = "$",
  currency = "USD",
  locale = "en-US",
}) => {
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
    <div className="bg-white rounded p-6 flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <Info className="h-4 w-4" />
      </div>

      <div className="pb-4">
        <p>{formatValue(value, type, symbol, locale, currency)}</p>
        <span
          className={`${
            change.startsWith("-") ? "text-red-500" : "text-green-500"
          }`}
        >
          {change.startsWith("-") ? (
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
