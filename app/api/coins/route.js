import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Extract parameters from the query string
  const limit = searchParams.get("limit") || "10";
  const offset = searchParams.get("offset") || "0";
  const page = parseInt(searchParams.get("page") || "1");
  const options = {
    headers: {
      "x-access-token": process.env.CRYPTO_API_KEY,
      // "Cache-Control": "no-cache, no-store, must-revalidate",
      // Pragma: "no-cache",
      // Expires: "0",
    },
  };
  try {
    const url = `https://api.coinranking.com/v2/coins?limit=${limit}&page=${page}&offset=${offset}`;

    const res = await fetch(url, options, { cache: "no-store" });

    const coinsData = await res.json();
    return NextResponse.json(coinsData);
  } catch (error) {
    console.log("error", error);
    return new Response("error", { status: 500 });
  }
}
