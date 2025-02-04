import Image from "next/image";

export default function Profile() {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-8xl mx-auto flex flex-col md:flex-row items-center md:items-stretch md:justify-center overflow-hidden">
        {/* <div className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-8xl mx-auto flex flex-col md:flex-row items-center md:items-stretch md:justify-center overflow-hidden" style={{ width: "800px", height: "300px" }}> */}


      {/* プロフィール画像 */}
      <div className="relative z-10 flex-1 w-full text-center md:text-left md:flex md:flex-col md:items-start md:justify-between md:pl-6 max-w-md rounded-lg flex items-center justify-center overflow-hidden">
        <Image src="/Profile.png" alt="プロフィール画像" fill className="cover" />
      </div>

      {/* プロフィール情報 */}
      <div className="relative z-10 flex-1 w-full text-center md:text-left md:flex md:flex-col md:items-start md:justify-between md:pl-6 max-w-md">
        <div className="mt-4 grid grid-cols-[1fr_4fr] gap-x-4 text-gray-700 w-full">
          <h2 className="text-2xl font-bold text-left col-span-2">Profile</h2>
          <span className="font-semibold text-left">Name</span>
          <span className="text-right">古田 尚貴</span>
          <span className="font-semibold text-left">Birthday</span>
          <span className="text-right">12/26</span>
          <span className="font-semibold text-left">Github</span>
          <a href="https://github.com/Nao-923" className="text-right text-blue-400" target="_blank" rel="noopener noreferrer">Nao-923</a>
          <span className="font-semibold text-left">Hobby</span>
          <span className="text-right">ゲーム/開発/ウイスキー/デスク周り/動画視聴</span>
          <span className="font-semibold text-left">Language</span>
          <span className="text-right">JS/TS/Python/Swift/C++(Arduino)/Java</span>
        </div>
        {/* 技術スタック画像 */}
        <h2 className="text-2xl font-bold text-left col-span-2">Tech</h2>
        <div className="mt-auto rounded-lg flex items-center justify-center overflow-hidden relative" style={{ width: '100%', height: '200px' }}>
          <Image src="/TechList.png" alt="技術スタック画像" fill className="cover" />
        </div>
      </div>
    </div>
  );
}
