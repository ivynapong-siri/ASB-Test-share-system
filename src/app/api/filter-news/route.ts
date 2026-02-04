import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const WordPressCustomUrl = process.env.WORDPRESS_CUSTOM_URL
    ? process.env.WORDPRESS_CUSTOM_URL
    : "https://dcb9450325.nxcli.io/wp-json/custom/v1";

  if (!category) {
    return NextResponse.json({ error: "Missing category" }, { status: 400 });
  }

  const wpURL = `${WordPressCustomUrl}/cards?category=${category}`;

  try {
    const res = await fetch(wpURL, {
      next: {
        tags: ["wordpress", "news", category],
        revalidate: 3600, // 1 hour
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch WordPress data" }, { status: res.status });
    }

    const response = NextResponse.json(data);
    response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
    return response;
  } catch (error) {
    console.error("Error fetching WordPress data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
