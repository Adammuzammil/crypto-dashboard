"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SingleChart = ({ name, selectedPeriod, selectedTimeFrame }) => {
  const id = name.toLowerCase();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&&days=${selectedTimeFrame}`
      );
      const data = await response.json();
      const historyData = data?.[selectedPeriod] || [];
      // console.log(historyData);
      const convertedData = historyData?.map((item, i) => {
        return {
          date: new Date(item[0] * 1000).toLocaleTimeString(),
          value: item[1],
        };
      });
      setHistory(convertedData);
    };

    getData();
  }, [name, selectedPeriod, selectedTimeFrame]);

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <div className="flex flex-col gap-2 bg-gray-600 text-white p-2 rounded-md">
            <p className="text-sm">{label}</p>
            <p className="label text-sm ">{`${new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(payload[0]?.value)}
          `}</p>
          </div>
        </div>
      );
    }

    return null;
  }

  function formatYAxis(value) {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + "B"; // Billion
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M"; // Million
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "K"; // Thousand
    }
    return value; // Return the value as is if it's less than 1000
  }

  return (
    <div className="h-[350px] md:h-[400px] lg:h-[450px]">
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={history}
          margin={{
            top: 5,
            left: -5,
            bottom: 55,
          }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={"1px"}
            dot={false}
          />
          <XAxis
            dataKey="date"
            angle={315}
            axisLine={false}
            tick={{ fontSize: 8 }}
            interval={"preserveStart"}
            tickMargin={12}
            tickLine={false}
            padding={{ right: 20 }}
          />
          <YAxis
            dataKey="value"
            domain={["auto", "auto"]}
            interval={0}
            axisLine={false}
            tick={{ fontSize: 10 }}
            tickMargin={12}
            tickLine={false}
            padding={{ right: 20 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          {/* <Legend /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleChart;
