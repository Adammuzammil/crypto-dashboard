"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trending, setTrending] = useState();
  const url = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setTrending(data.coins);
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto p-4 px-6 mt-8 mb-6">
      <div className="my-6">
        <h1 className="text-3xl text-center font-bold dark:text-white text-black">
          Trending Coins
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 pt-4">
        {trending?.map((coin, i) => (
          <Link
            href={`/coins/${coin?.item?.id}`}
            key={i}
            className="cursor-pointer"
          >
            <div>
              <div className="rounded-lg bg-white shadow-lg p-2 px-4 relative bg-gradient-to-r from-gray-500 to-blue-500 bg-[length:200%_200%] bg-left hover:bg-right transition-all duration-500">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-white dark:text-black">
                    <h3>Name</h3>
                    <p className="text-white dark:text-black">
                      {coin?.item?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-white dark:text-black">
                      {coin?.item?.data?.market_cap}
                    </span>
                  </div>
                  <div>
                    <span className="text-white dark:text-black">
                      {coin?.item?.data?.price}
                    </span>
                  </div>

                  <div>
                    <span className="text-white dark:text-black">
                      {coin?.item?.market_cap_rank}
                    </span>
                  </div>
                </div>

                <Image
                  src={coin?.item?.large}
                  alt={coin?.item?.name || "coin"}
                  width={96} // equivalent to w-24
                  height={96} // equivalent to h-24
                  className="absolute top-2/4 -translate-y-2/4 rounded-full -right-5"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
