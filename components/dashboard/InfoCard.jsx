import React, { useState } from "react";
import { Info, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const formatValue = (value, type, symbol, locale, currency) =>
  type === "currency"
    ? new Intl.NumberFormat(locale, { style: "currency", currency }).format(
        value
      )
    : `${new Intl.NumberFormat(locale).format(value)} ${symbol}`;

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

  return (
    <Card className="relative h-40">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{title}</h3>
          <div
            className="relative"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <Info className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700" />

            {showInfo && (
              <div className="absolute right-0 top-6 bg-white shadow-lg rounded-lg p-4 w-64 z-10 border">
                <p className="text-sm text-gray-700 mb-2">{desc}</p>
                <p className="text-sm text-gray-500">{subdesc}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-xl font-bold mb-2">
            {formatValue(value, type, symbol, locale, currency)}
          </p>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 ${
                change < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {change < 0 ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              <span className="font-medium">{change}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
