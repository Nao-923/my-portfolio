export const runtime = 'edge';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_PROFILE_DB_ID}/query`,
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
      console.error("Notion API Error:", errorData);
      return NextResponse.json(
        { error: "Notion API Error", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Notion API Response Data:", JSON.stringify(data, null, 2));

    if (!data.results.length) {
      return NextResponse.json({ error: "No profile data found" }, { status: 404 });
    }

    const profileData = data.results[0].properties;
    console.log("Profile Data from Notion:", JSON.stringify(profileData, null, 2));

    const formattedProfile = {
      name: profileData.name?.rich_text?.[0]?.plain_text || "No Name",
      birthday: profileData.birthday?.rich_text?.[0]?.plain_text || "No Birthday",
      github: profileData.github?.url || "",
      hobby: profileData.hobby?.rich_text ? profileData.hobby.rich_text.map((h: { plain_text: string }) => h.plain_text) : [],
      language: profileData.language?.rich_text ? profileData.language.rich_text.map((l: { plain_text: string }) => l.plain_text) : [],
      tech: profileData.tech?.files?.[0]?.file?.url || "",
      profileImage: profileData.profileImage?.files?.[0]?.file?.url || "",
    };

    return NextResponse.json(formattedProfile, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}