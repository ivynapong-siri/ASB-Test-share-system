import { searchAllContent } from "@/server/fetches/search-all-content";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }
  try {
    const results = await searchAllContent(query);
    const response = NextResponse.json(results);
    response.headers.set("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
