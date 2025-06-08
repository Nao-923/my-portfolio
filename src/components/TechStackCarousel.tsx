"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// https://simpleicons.org/ シンプルアイコンから引用
const techIcons = [
  "/icons/Arc.png",
  "/icons/arduino.png",
  "/icons/autodesk.png",
  "/icons/cloudflare.png",
  "/icons/diagramsdotnet.png",
  "/icons/discord.png",
  "/icons/Docker.png",
  "/icons/git.png",
  "/icons/GoogleColab.png",
  "/icons/iterm2.png",
  "/icons/javascript.png",
  "/icons/KiCad.png",
  "/icons/MongoDB.png",
  "/icons/MySQL.png",
  "/icons/nextdotjs.png",
  "/icons/nodedotjs.png",
  "/icons/nodered.png",
  "/icons/Notion.png",
  "/icons/outline.png",
  "/icons/PlatformIO.png",
  "/icons/portainer.png",
  "/icons/python.png",
  "/icons/RaspberryPi.png",
  "/icons/React.png",
  "/icons/Render.png",
  "/icons/Tailscale.png",
  "/icons/Tinkercad.png",
  "/icons/typescript.png",
  "/icons/ubuntu.png",
  "/icons/Wireshark.png",
  "/icons/Xcode.png",
];

export default function TechStackCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState({ width: 800, height: 300 });
  const [icons, setIcons] = useState(
    techIcons.map(() => ({
      x: 0, // 初期値は 0 にする（SSR時にMath.random()を使わない）
      y: 0,
      dx: 0,
      dy: 0,
    }))
  );

  // 初回 & ウィンドウリサイズ時に親要素のサイズを取得
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setBoxSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // クライアントサイドでアイコンの初期位置をランダムに設定
  useEffect(() => {
    setIcons(
      techIcons.map(() => ({
        x: Math.random() * (boxSize.width - 50),
        y: Math.random() * (boxSize.height - 50),
        dx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1),
        dy: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1),
      }))
    );
  }, [boxSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          const newX = icon.x + icon.dx;
          const newY = icon.y + icon.dy;
          let newDx = icon.dx;
          let newDy = icon.dy;

          // 壁にぶつかったら跳ね返る（反転）
          if (newX <= 0 || newX >= boxSize.width - 50) newDx *= -1;
          if (newY <= 0 || newY >= boxSize.height - 50) newDy *= -1;

          return { x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );
    }, 20); // 20msごとに更新

    return () => clearInterval(interval);
  }, [boxSize]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <Image
          key={index}
          src={techIcons[index]}
          alt={`Tech Icon ${index}`}
          width={40}
          height={40}
          style={{
            position: "absolute",
            left: `${icon.x}px`,
            top: `${icon.y}px`,
          }}
        />
      ))}
    </div>
  );
}