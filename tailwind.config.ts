import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-red-300", "text-red-800",
    "bg-blue-300", "text-blue-800",
    "bg-yellow-300", "text-yellow-800",
    "bg-purple-300", "text-purple-800",
    "bg-teal-300", "text-teal-800",
    "bg-orange-300", "text-orange-800",
    "bg-pink-300", "text-pink-800",
    "bg-black", "text-white",
    "bg-green-300", "text-green-800",
    "bg-indigo-300", "text-indigo-800",
    "bg-gray-300", "text-gray-800",
    "bg-green-400", "text-green-900",
    "bg-blue-400", "text-blue-900",
    "bg-gray-400", "text-gray-900",
    "bg-purple-400", "text-purple-900",
    "bg-orange-400", "text-orange-900",
    "bg-pink-400", "text-pink-900",
    "bg-yellow-400", "text-yellow-900",
  ],
};

export default config;
