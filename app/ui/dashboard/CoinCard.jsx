import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CoinCard = ({ coin }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const isPositiveChange = coin?.change >= 0;

  return (
    <Card className="group relative hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-24 sm:h-24 opacity-20 transform scale-125 translate-x-[-15%] translate-y-[10%] rotate-45">
        <Image
          src={coin?.iconUrl}
          layout="fill"
          objectFit="contain"
          alt={coin?.name}
        />
      </div>

      <CardHeader className="pb-2 relative z-10 px-4">
        {/* Coin Name & Icon */}
        <div className="flex items-center gap-2">
          <CardTitle className="text-black dark:text-white text-sm">
            {coin?.name}
            <span className="text-gray-600"> ({coin?.symbol})</span>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex justify-between items-center relative z-10 px-4">
        {/* Coin Price & Change */}
        <div className="flex flex-col gap-2">
          <div className="text-lg sm:text-xl font-semibold text-black dark:text-white">
            {formatCurrency(coin?.price)}
          </div>
          <div
            className={`py-1 rounded-md text-sm font-bold w-fit ${
              isPositiveChange
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {/* Arrow and percentage */}
            {isPositiveChange ? (
              <div className="flex items-center">
                <TrendingUp
                  className="text-green-600 dark:text-green-400 mr-1"
                  size={16}
                />
                +{coin.change}%
              </div>
            ) : (
              <div className="flex items-center">
                <TrendingDown
                  className="text-red-600 dark:text-red-400 mr-1"
                  size={16}
                />
                {coin.change}%
              </div>
            )}
          </div>
        </div>

        {/* Small Graph on Right Side */}
        <div className="w-16 h-10">
          <Sparklines data={coin?.sparkline} width={100} height={40}>
            <SparklinesLine
              style={{
                stroke: isPositiveChange ? "#4ade80" : "#f87171",
                fill: "none",
                strokeWidth: 2,
              }}
            />
          </Sparklines>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
