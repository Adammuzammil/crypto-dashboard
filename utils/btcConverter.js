export function btcToUsd(btcAmount) {
  // Current BTC to USD rate calculated from the data
  const BTC_USD_RATE = 3669350015260.2026 / 37284465.90275418;

  // Convert and round to 2 decimal places
  const usdAmount = btcAmount * BTC_USD_RATE;
  return Math.round(usdAmount * 100) / 100;
}
