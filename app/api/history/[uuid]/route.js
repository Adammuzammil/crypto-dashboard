import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { uuid } = params;
  const { searchParams } = new URL(request.url);
  const timePeriod = searchParams.get("timePeriod") || "24h";
  const options = {
    headers: {
      "x-access-token": process.env.CRYPTO_API_KEY,
      // "Cache-Control": "no-cache, no-store, must-revalidate",
      // Pragma: "no-cache",
      // Expires: "0",
    },
  };
  try {
    const url = `https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${timePeriod}`;

    const res = await fetch(url, options, { cache: "no-store" });

    const coinsData = await res.json();
    return NextResponse.json(coinsData);
  } catch (error) {
    console.log("error", error);
    return new Response("error", { status: 500 });
  }
}
