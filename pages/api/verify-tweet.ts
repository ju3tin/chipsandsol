import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tweetUrl } = await req.json();

    if (!tweetUrl || !tweetUrl.startsWith("https://twitter.com/")) {
      return NextResponse.json({ success: false, error: "Invalid tweet URL" }, { status: 400 });
    }

    // Fetch tweet page (no API key)
    const response = await fetch(tweetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // make it look like a browser
      },
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: "Tweet not found" }, { status: 404 });
    }

    const html = await response.text();

    // Basic check: look for "twitter:title" meta tag (which always contains tweet text)
    const tweetExists = html.includes("twitter:title");

    if (!tweetExists) {
      return NextResponse.json({ success: false, error: "Could not verify tweet" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Tweet verified ✅" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
