"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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

const AnalyticsChart = ({ coin, selectedPeriod }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCoinsHistory = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/history/${coin.uuid}?timePeriod=${selectedPeriod}`
      );
      const historyData = response?.data?.data?.history || [];
      const convertedData = historyData.map((item) => ({
        date: new Date(item.timestamp * 1000).toLocaleTimeString(),
        prices: item.price,
      }));
      setHistory(convertedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [coin.uuid, selectedPeriod]);

  useEffect(() => {
    getCoinsHistory();
  }, [getCoinsHistory]);

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

  return (
    <div className="w-full max-w-full h-[350px] md:h-[400px] lg:h-[450px]">
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={history}
          margin={{
            top: 5,
            left: -20,
            bottom: 55,
          }}
        >
          <Line
            type="monotone"
            dataKey="prices"
            stroke={coin?.color}
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
            dataKey="prices"
            domain={["auto", "auto"]}
            interval={0}
            axisLine={false}
            tick={{ fontSize: 10 }}
            tickMargin={12}
            tickLine={false}
            padding={{ right: 20 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          {/* <Legend /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
