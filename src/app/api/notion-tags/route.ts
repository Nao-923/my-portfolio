import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching tags from Notion...");

    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_TAGS_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: "Notion API Error", details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 });
  }
}