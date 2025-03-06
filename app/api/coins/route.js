import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const API_KEY = process.env.CRYPTO_GECKO_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1; // Get page from query params (default 1)
  const per_page = 10; // 10 coins per page

  const options = {
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
    next: { revalidate: 60 }, // Use Next.js built-in cache with revalidation
  };

  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${per_page}&page=${page}&sparkline=true`;
    const res = await fetch(url, options);

    if (res.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const coinsData = await res.json();

    return NextResponse.json({ coins: coinsData, page: Number(page) });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
