"use client";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
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

const SingleChart = ({ id, selectedPeriod, selectedTimeFrame }) => {
  const [history, setHistory] = useState([]);
  const [chartWidth, setChartWidth] = useState(0);
  const [currentDay, setCurrentDay] = useState(""); // Track current day
  const [currentTime, setCurrentTime] = useState("");

  const getTickInterval = useCallback((dataLength, width) => {
    // Target showing around 6-8 ticks depending on screen width
    const targetTicks = width < 400 ? 3 : width < 600 ? 5 : 8;
    return Math.ceil(dataLength / targetTicks);
  }, []);

  // Custom tick formatter for X axis
  const CustomTick = ({ x, y, payload }) => {
    const label =
      payload.value.length > 6
        ? `${payload.value.slice(0, 6)}…`
        : payload.value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={12}
        >
          {label}
        </text>
      </g>
    );
  };

  useEffect(() => {
    // Function to update current day and time
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDay(
        now.toLocaleDateString([], {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime(); // Initial update
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const formatData = (rawData) => {
      const periodData = rawData?.[selectedPeriod] || [];
      return periodData.map(([timestamp, value]) => ({
        date: format(new Date(timestamp), getDateFormat(selectedTimeFrame)),
        value: Number(value.toFixed(2)),
      }));
    };

    const getDateFormat = (timeFrame) => {
      switch (timeFrame) {
        case "1":
          return "HH:mm";
        case "7":
          return "MMM dd ";
        case "30":
          return "MMM dd";
        case "365":
          return "MMM yyyy";
        default:
          return "HH:mm";
      }
    };
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&&days=${selectedTimeFrame}`
        );
        const data = await response.json();
        const convertedData = formatData(data);
        setHistory(convertedData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setHistory([]);
      }
    };

    getData();
  }, [name, selectedPeriod, selectedTimeFrame]);

  function CustomTooltip({ payload, label, active }) {
    if (active && payload?.[0]) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm mt-1">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(payload[0].value)}
          </p>
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
    <div className="h-[400px] w-full max-w-full overflow-hidden">
      <ResponsiveContainer
        width="100%"
        height="100%"
        onResize={(width) => setChartWidth(width)}
      >
        <LineChart
          data={history}
          margin={{
            top: 20,
            left: chartWidth < 600 ? 20 : 60,
            right: chartWidth < 600 ? 20 : 60,
            bottom: 30,
          }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
          <XAxis
            dataKey="date"
            angle={0}
            tick={<CustomTick />}
            axisLine={false}
            tickLine={false}
            interval={getTickInterval(history.length, chartWidth)}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            dataKey="value"
            orientation="right"
            domain={["auto", "auto"]}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF", dx: 10 }}
            tickLine={false}
            tickFormatter={formatYAxis}
            width={40}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#4B5563", strokeWidth: 1 }}
          />
          {/* <Legend /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleChart;
