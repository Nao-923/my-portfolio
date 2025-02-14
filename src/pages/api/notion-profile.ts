export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            return res.status(response.status).json({ error: "Notion API Error", details: errorData });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}