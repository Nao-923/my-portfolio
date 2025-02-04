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

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagColors: Record<string, string> = {
    "Fanatec": "bg-red-300 text-red-800",
    "ラジコン": "bg-green-300 text-green-800",
    "M5BugC2": "bg-blue-300 text-blue-800",
    "Minecraft": "bg-yellow-300 text-yellow-800",
    "サーバー": "bg-gray-300 text-gray-800",
    "Tailscale": "bg-purple-300 text-purple-800",
    "メタバース": "bg-indigo-300 text-indigo-800",
    "ローカル": "bg-teal-300 text-teal-800",
    "ComfyUI": "bg-orange-300 text-orange-800",
    "StableDiffusion": "bg-pink-300 text-pink-800",
    "画像生成": "bg-blue-400 text-blue-900",
    "読書": "bg-yellow-400 text-yellow-900",
    "本": "bg-red-400 text-red-900",
    "ブックリスト": "bg-green-400 text-green-900",
    "デスク": "bg-gray-400 text-gray-900",
    "改造": "bg-purple-400 text-purple-900",
    "作業環境": "bg-indigo-400 text-indigo-900",
    "ウイスキー": "bg-orange-400 text-orange-900",
    "酒": "bg-pink-400 text-pink-900",
    "リスト": "bg-teal-400 text-teal-900",
    "マイページ": "bg-blue-500 text-blue-900",
    "ポートフォリオ": "bg-purple-500 text-purple-900",
    "Next.js": "bg-black text-white",
    "MongoDB": "bg-green-500 text-green-900",
  };

  useEffect(() => {
    async function fetchContents() {
      try {
        const res = await fetch("/api/contents");
        if (!res.ok) throw new Error("Failed to fetch contents");
        const data: Content[] = await res.json();
        setContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    }
    fetchContents();
  }, []);

  const filteredContents = selectedTag ? contents.filter(content => content.tags.includes(selectedTag)) : contents;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="relative z-10 text-4xl font-bold text-center mb-8">Welcome to My Page !</h1>
      <div className="relative z-10">
        <Profile />
      </div>
      <div className="relative z-10 my-6 flex flex-wrap gap-2 justify-center">
        <button onClick={() => setSelectedTag(null)} className="bg-gray-300 px-3 py-1 rounded-full text-sm font-semibold">すべて表示</button>
        {Object.keys(tagColors).map((tag, index) => (
          <button key={index} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 rounded-full text-sm font-semibold ${tagColors[tag]} ${selectedTag === tag ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}>
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