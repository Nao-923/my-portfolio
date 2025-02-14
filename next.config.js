/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Cloudflare Workers で API を動作させる
    experimental: {
      appDir: false, // App Router を無効化（API Routes を `pages/api/` で使うため）
    },
    images: {
        domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
    },
  };
  
  module.exports = nextConfig;