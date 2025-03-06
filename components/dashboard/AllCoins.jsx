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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);

  const coinsPerPage = 10;

  // Fetch coins data based on the page number
  const fetchCoins = async (page) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/coins?page=${page}`);
      const newCoins = response.data.coins;

      setCoins(newCoins);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins(currentPage);
  }, [currentPage]);

  console.log(coins);

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
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full ">
      <div className="bg-white dark:bg-gray-800 rounded-xl  overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <h2 className="text-xl md:text-2xl font-semibold dark:text-gray-100">
            Live Market Value
          </h2>
          <Input
            placeholder="Search cryptocurrencies..."
            className="w-full md:max-w-sm"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[800px] md:min-w-full">
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="min-w-[180px]">Cryptocurrency</TableHead>
                <TableHead className="min-w-[120px]">Change(24h)</TableHead>
                <TableHead className="text-center min-w-[120px]">
                  <Button variant="ghost" onClick={sortPrice} className="px-2">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[140px] hidden md:table-cell">
                  24h Volume
                </TableHead>
                <TableHead className="min-w-[140px] hidden md:table-cell">
                  Market Cap
                </TableHead>
                <TableHead className="min-w-[140px] hidden sm:table-cell">
                  Last 7 Days
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData?.map((coin, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                >
                  <TableCell className="py-3">
                    <Star
                      size={18}
                      className="text-gray-400 hover:fill-yellow-400 hover:text-yellow-400 transition-colors"
                    />
                  </TableCell>

                  <TableCell className="py-3">
                    <Link
                      href={`/coins/${coin?.id}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={coin?.image}
                        alt={coin.name}
                        className="w-7 h-7 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium dark:text-gray-100">
                          {coin.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                          {coin?.symbol}
                        </span>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="py-3">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
                        coin?.price_change_percentage_24h < 0
                          ? "text-red-600 "
                          : "text-green-600 "
                      }`}
                    >
                      {coin?.price_change_percentage_24h < 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center py-3 font-medium dark:text-gray-100">
                    ${coin?.current_price?.toLocaleString()}
                  </TableCell>

                  <TableCell className="hidden md:table-cell py-3 dark:text-gray-300">
                    ${coin?.total_volume?.toLocaleString()}
                  </TableCell>

                  <TableCell className="hidden md:table-cell py-3 dark:text-gray-300">
                    {formatMarketCap(coin?.market_cap)}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell py-3">
                    <div className="w-[100px]">
                      <Sparklines data={coin?.sparkline_in_7d?.price}>
                        <SparklinesLine
                          style={{ strokeWidth: 2 }}
                          color={
                            coin?.price_change_percentage_24h < 0
                              ? "#dc2626"
                              : "#16a34a"
                          }
                        />
                      </Sparklines>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedData.length} of {filteredData.length} coins
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            Previous
          </Button>
          <span className="px-4 text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllCoins;
