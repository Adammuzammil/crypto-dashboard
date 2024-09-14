"use client";

import React, { useEffect, useState } from "react";
import BlockChainLinks from "./info/BlockChainLinks";
import Link from "next/link";
import { Facebook, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaGithub, FaReddit } from "react-icons/fa";
import Categories from "./info/Categories";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const OtherInfo = ({ name }) => {
  const id = name.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const [info, setInfo] = useState();

  useEffect(() => {
    const getPriceData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setInfo(data);
    };

    getPriceData();
  }, [name]);

  const cleanUrl = (url) => {
    if (typeof url === "string") {
      // Remove protocol (http or https)
      let myUrl = url.replace(/https?:\/\//, "");
      // Remove 'www.' if it exists
      myUrl = myUrl.replace(/^www\./, "");

      return myUrl;
    } else {
      console.error("Provided url is not a string");
    }
  };

  const domainNames = (
    info?.links?.homepage ||
    info?.links?.official_forum_url ||
    []
  )
    .map((link) => ({
      domain: cleanUrl(link),
      url: link,
    }))
    .filter(({ domain }) => domain);

  return (
    <div className="bg-white rounded-lg shadow mt-2 p-8 px-6">
      <h1 className="text-xl font-semibold">Info</h1>

      <hr className="my-4" />

      <div className="flex flex-col justify-center gap-8">
        {/* Price Info */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Blockchain</span>
          <BlockChainLinks info={info} />
        </div>

        {/* Website */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Website</span>
          <div className="flex items-center gap-2 bg-gray-200 p-1 px-2 rounded-lg">
            {domainNames.map(({ domain, url }, i) => (
              <span key={i} value={domain} className="text-xs font-bold">
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Categories</span>
          <Categories info={info} />
        </div>

        {/* WhitePaper  */}
        {info?.links?.whitepaper && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Whitepaper</span>
            <Link
              href={info?.links?.whitepaper}
              className="bg-gray-200 p-1 px-2 rounded-lg text-xs font-bold"
            >
              Whitepaper
            </Link>
          </div>
        )}

        {/* Community */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Community</span>

          <div className="flex flex-col md:flex-row items-center gap-3">
            {info?.links?.twitter_screen_name && (
              <div className="flex items-center gap-1 bg-gray-200 p-1 px-2 rounded-lg text-xs font-bold">
                <Link
                  href={`https://twitter.com/${info.links.twitter_screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </Link>
                <p className="text-xs">Twitter</p>
              </div>
            )}
            {info?.links?.facebook_username && (
              <div className="flex items-center gap-3 bg-gray-200 p-1 px-2 rounded-lg text-xs font-bold">
                <Link
                  href={`https://facebook.com/${info.links.facebook_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </Link>
                <p className="text-xs">Facebook</p>
              </div>
            )}
            <div className="flex items-center gap-2 bg-gray-200 p-1 px-2 rounded-lg">
              {domainNames.map(({ domain, url }, i) => (
                <span key={i} value={domain} className="text-xs font-bold">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Github */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Github</span>
          {info?.links?.repos_url?.github[0] && (
            <div className="flex items-center gap-3 bg-gray-200 p-1 px-2 rounded-lg text-xs font-bold">
              <Link
                href={info?.links?.repos_url?.github[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </Link>
              <p className="text-xs">Github</p>
            </div>
          )}
        </div>

        {/* Social */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Social</span>
          {info?.links?.subreddit_url && (
            <div className="flex items-center gap-3 bg-gray-200 p-1 px-2 rounded-lg text-xs font-bold">
              <Link
                href={info?.links?.subreddit_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaReddit />
              </Link>
              <p className="text-xs">Reddit</p>
            </div>
          )}
        </div>

        {/* Sentiment */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Sentiment</span>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span
                className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25 bg-green text-green-500
          
          `}
              >
                {info?.sentiment_votes_up_percentage}
              </span>
              <BiSolidUpArrow className="text-green-500" />
            </div>
            <div className="flex items-center">
              <span
                className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-red text-red-500
          `}
              >
                {info?.sentiment_votes_down_percentage}
              </span>
              <BiSolidDownArrow className="text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
