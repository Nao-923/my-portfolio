import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  birthday: string;
  github: string;
  hobby: string[];
  language: string[];
  tech: string;
  profileImage: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/notion-profile");
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }
        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("プロフィール情報の取得に失敗しました。");
      }
    }
    fetchProfile();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!profile) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-8xl mx-auto flex flex-col md:flex-row items-start md:items-stretch md:justify-center overflow-hidden gap-3">
      {/* Profile Image */}
      <div className="relative z-10 w-full md:w-1/2 md:max-w-sm">
        <div className="relative w-full aspect-[1/1] rounded-lg overflow-hidden">
          <Image
            src={profile.profileImage}
            alt="プロフィール画像"
            width={440} // 固定幅
            height={440} // 固定高さ
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="relative z-10 flex-1 w-full text-center md:text-left md:flex md:flex-col md:items-start md:justify-between md:pl-6 max-w-md">
        <div className="mt-4 grid grid-cols-[1fr_4fr] gap-x-4 text-gray-700 w-full">
          <h2 className="text-2xl font-bold text-left col-span-2">Profile</h2>
          <span className="font-semibold text-left">Name</span>
          <span className="text-right">{profile.name}</span>
          <span className="font-semibold text-left">Birthday</span>
          <span className="text-right">{profile.birthday}</span>
          <span className="font-semibold text-left">Github</span>
          <a
            href={profile.github}
            className="text-right text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nao-923
          </a>
          <span className="font-semibold text-left">Hobby</span>
          <span className="text-right">{profile.hobby}</span>
          <span className="font-semibold text-left">Language</span>
          <span className="text-right">{profile.language}</span>
        </div>

        {/* 技術スタック画像 */}
        <h2 className="text-2xl font-bold text-left col-span-2">Tech</h2>
        <div
          className="mt-auto rounded-lg flex items-center justify-center overflow-hidden relative"
          style={{ width: "100%", height: "200px" }}
        >
          <Image
            src={profile.tech}
            alt="技術スタック画像"
            fill
            className="cover"
          />
        </div>
      </div>
    </div>
  );
}