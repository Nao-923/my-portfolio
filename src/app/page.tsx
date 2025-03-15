"use client";
import ContentCard from "@/components/ContentCard";
import Profile from "@/components/Profile";
import TechStackCarousel from "@/components/TechStackCarousel";
import { useEffect, useState } from "react";
import "./globals.css";

interface Content {
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
}
interface NotionResponse<T> {
  results: Array<{ properties: T }>;
}

interface ContentProperties {
  title?: { title: { plain_text: string }[] };
  description?: { rich_text: { plain_text: string }[] };
  url?: { url: string };
  image?: { files: { file: { url: string } }[] };
  tags?: { rich_text: { plain_text: string }[] };
  status?: { status: { name: string; color: string } }; // 修正ポイント
}
interface TagProperties {
  title?: { title: { plain_text: string }[] };
  fontColor?: { rich_text: { plain_text: string }[] };
  backColor?: { rich_text: { plain_text: string }[] };
}



export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [tagColors, setTagColors] = useState<Record<string, string>>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContentsFromNotion() {
      try {
        const response = await fetch("/api/notion");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Notion API Error:", errorData);
          return;
        }
  
        const data: NotionResponse<ContentProperties> = await response.json();
        const formattedContents: Content[] = data.results.map((item) => ({
          title: item.properties.title?.title[0]?.plain_text || "No Title",
          description: item.properties.description?.rich_text[0]?.plain_text || "No Description",
          url: item.properties.url?.url || "",
          image: item.properties.image?.files[0]?.file.url || "/default.png",
          tags: item.properties.tags?.rich_text[0]?.plain_text
            ? item.properties.tags.rich_text[0].plain_text.replace(/["“”]/g, "").split(", ")
            : [],
          status: item.properties.status?.status?.name || "No Status", // 正しいステータスの取得
          statusColor: item.properties.status?.status?.color || "default",
        }));
  
        setContents(formattedContents);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
  
    async function fetchTagsFromNotion() {
      try {
        const response = await fetch("/api/notion-tags");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Notion API Error:", errorData);
          return;
        }
  
        const data: NotionResponse<TagProperties> = await response.json();
        const formattedTagColors: Record<string, string> = {};
  
        data.results.forEach((item) => {
          const tagName = item.properties.title?.title[0]?.plain_text || "Unknown";
          const fontColor = item.properties.fontColor?.rich_text[0]?.plain_text || "text-black";
          const backColor = item.properties.backColor?.rich_text[0]?.plain_text || "bg-gray-200";
          formattedTagColors[tagName] = `${backColor} ${fontColor}`;
        });
  
        setTagColors(formattedTagColors);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
  
    fetchContentsFromNotion();
    fetchTagsFromNotion();
  }, []);

  const filteredContents = selectedTag
    ? contents.filter((content) => content.tags.includes(selectedTag))
    : contents;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="relative z-10 text-4xl font-bold text-center mb-8">Welcome to My Page !</h1>
      <h1 className="relative z-10 text-2xl font-bold text-center mb-8 text-red-600">※未完成の記事が多数あります</h1>
      <div className="relative z-10">
        <Profile />
      </div>
      <div className="relative z-10 my-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedTag(null)}
          className="bg-gray-300 px-3 py-1 rounded-full text-sm font-semibold"
        >
          すべて表示
        </button>
        {Object.keys(tagColors).map((tag, index) => (
          <button
            key={index}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${tagColors[tag]} ${selectedTag === tag ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TechStackCarousel />
      </div>
      <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredContents.map((content, index) => (
          <ContentCard key={index} {...content} tagColors={tagColors} />
        ))}
      </div>
    </main>
  );
}
