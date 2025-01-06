import { FaUsers } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { TrendingDown, TrendingUp } from "lucide-react";

const CoinCard = ({ coin }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const gradientStyle = {
    background: `linear-gradient(to right top, ${coin.color}, #38bdf8)`, // sky-400 in hex
  };

  const isPositiveChange = !coin?.change?.startsWith("-");

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 from-primary/20 to-primary/10 rounded-full animate-pulse" />
              <div
                className="relative p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "hsl(var(--card))",
                }}
              >
                <Image
                  src={coin?.iconUrl}
                  width={32}
                  height={32}
                  alt={coin?.name}
                  className="w-6 h-6"
                />
              </div>
            </div>
            <CardTitle className="text-lg font-semibold">
              {coin?.name}
            </CardTitle>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
            ${
              isPositiveChange
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isPositiveChange ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {isPositiveChange ? `+${coin.change}` : coin.change}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="text-2xl font-bold tracking-tight">
            {formatCurrency(coin?.price)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {coin?.symbol}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
