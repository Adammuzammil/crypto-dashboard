"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Star, TrendingDown, TrendingUp } from "lucide-react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/router";

const AllCoins = () => {
  const [coins, setCoins] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 100;
  const coinsPerpage = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/coins?limit=${limit}&offset=${offset}`
      );
      setCoins(response?.data?.data?.coins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  function formatMarketCap(marketCap) {
    if (marketCap >= 1e9) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e9)}B`;
    } else if (marketCap >= 1e6) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e6)}M`;
    } else if (marketCap >= 1e3) {
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(marketCap / 1e3)}K`;
    } else {
      return new Intl.NumberFormat("en-US").format(marketCap);
    }
  }

  const sortPrice = () => {
    const sorted = [...coins].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCoins(sorted);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * coinsPerpage,
    currentPage * coinsPerpage
  );

  const totalPages = Math.ceil(filteredData.length / coinsPerpage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div>
        <Input
          placeholder="Search..."
          className="max-w-sm mb-4 my-4"
          onChange={handleSearch}
        />
      </div>
      <div className="bg-white rounded-xl shadow-xl">
        <div className="p-4">
          <h2 className="text-2xl mt-2">Live Market Value</h2>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="">Cryptocurrency</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" onClick={sortPrice}>
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="">24h Volume</TableHead>
              <TableHead className="">Market Cap</TableHead>
              <TableHead className="">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.map((coin, i) => (
              <TableRow key={i}>
                <TableCell className="cursor-pointer">
                  <Star size={15} fill="orange" color="orange" />
                </TableCell>
                <Link href={`/coins/${coin?.uuid}`} passHref>
                  <TableCell className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <img
                        src={coin?.iconUrl}
                        alt={coin.name}
                        className="w-7 h-7"
                      />
                      <div className="flex items-center gap-2">
                        <span> {coin.name}</span>
                        <span className="text-xs text-gray-400 ">
                          {coin?.symbol}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </Link>
                <TableCell>
                  <span className="">
                    <span
                      className={`text-xs flex items-center gap-1 ${
                        coin?.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {coin?.change.startsWith("-") ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      {coin?.change || "N/A"}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="text-center">{coin?.price}</TableCell>
                <TableCell className="">{coin?.["24hVolume"]}</TableCell>
                <TableCell className="">
                  {formatMarketCap(coin?.marketCap)}
                </TableCell>
                <TableCell>
                  <Sparklines data={coin?.sparkline}>
                    <SparklinesLine
                      style={{ fill: "none" }}
                      color={coin?.color}
                    />
                    <SparklinesSpots />
                  </Sparklines>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-4 items-center justify-between my-4">
        <div className="pl-1">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-4">
          <Button onClick={handlePrevious} disabled={currentPage === 1}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllCoins;
