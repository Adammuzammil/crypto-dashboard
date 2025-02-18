"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoConverter = () => {
  const [cryptos, setCryptos] = useState([]);
  const [fromCrypto, setFromCrypto] = useState("btc"); // default from crypto (e.g., Bitcoin)
  const [toCrypto, setToCrypto] = useState("eth"); // default to crypto (e.g., Ether)
  const [amount, setAmount] = useState(1); // Amount to convert
  const [conversionRate, setConversionRate] = useState(null); // Conversion rate
  const [convertedAmount, setConvertedAmount] = useState(null); // Converted amount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the exchange rates data
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/exchange_rates"
        );
        setCryptos(response.data.rates);
        setError(null);
      } catch (err) {
        setError("Failed to fetch exchange rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  // Fetch conversion rate based on selected cryptocurrencies
  useEffect(() => {
    if (fromCrypto && toCrypto) {
      const fromRate = cryptos[fromCrypto]?.value;
      const toRate = cryptos[toCrypto]?.value;

      if (fromRate && toRate) {
        const rate = toRate / fromRate;
        setConversionRate(rate);
        setConvertedAmount(amount * rate);
      }
    }
  }, [fromCrypto, toCrypto, amount, cryptos]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Crypto Converter
      </h2>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Loading currencies...
          </p>
        </div>
      ) : error ? (
        <div className="p-4 mb-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="any"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <select
                value={fromCrypto}
                onChange={(e) => setFromCrypto(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(cryptos).map((cryptoKey) => (
                  <option key={cryptoKey} value={cryptoKey}>
                    {cryptos[cryptoKey]?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <select
                value={toCrypto}
                onChange={(e) => setToCrypto(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(cryptos).map((cryptoKey) => (
                  <option key={cryptoKey} value={cryptoKey}>
                    {cryptos[cryptoKey]?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {conversionRate !== null && convertedAmount !== null && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-center">
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {amount} {cryptos[fromCrypto]?.unit} =
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300 mt-2">
                {convertedAmount.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}{" "}
                {cryptos[toCrypto]?.unit}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                1 {cryptos[fromCrypto]?.unit} = {conversionRate.toFixed(4)}{" "}
                {cryptos[toCrypto]?.unit}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CryptoConverter;
