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
  console.log(coin);
  function formatCurrency(value, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  }

  const gradientStyle = {
    background: `linear-gradient(to right top, ${coin.color}, #38bdf8)`, // sky-400 in hex
  };
  return (
    <Card
      className="w-full shadow-2xl relative border-none flex flex-col"
      style={gradientStyle}
    >
      <div
        className="absolute inset-0 opacity-5 -z-50 rounded-lg"
        style={{
          backgroundImage: `url(/grain.jpg)`,
        }}
      ></div>
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle className="text-sm md:text-lg font-medium flex items-center gap-2 text-white">
          <Image
            src={coin?.iconUrl}
            width={100}
            height={100}
            className="w-5 h-5 md:w-8 md:h-8"
          />
          <span className="text-xl">{coin?.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex">
          <div className="text-2xl font-bold text-white">
            {formatCurrency(coin?.price)}
          </div>
        </div>
        <div>
          <span
            className={`text-sm bg-white/65 px-3 py-1.5 rounded-full ${
              coin?.change.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {coin?.change.startsWith("-")
              ? coin.change
              : `+${coin.change || "N/A"}`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
