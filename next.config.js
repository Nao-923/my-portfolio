/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
  // Cloudflare Pages の Edge Runtime を指定
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;