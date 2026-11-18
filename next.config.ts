import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: "/campaigns/:path*",
          destination: "https://agent-factory-smoky.vercel.app/campaigns/:path*",
        },
        {
          source: "/api/og",
          destination: "https://agent-factory-smoky.vercel.app/api/og",
        },
        {
          source: "/api/og/:path*",
          destination: "https://agent-factory-smoky.vercel.app/api/og/:path*",
        },
      ],
      fallback: [
        {
          source: "/_next/static/:path*",
          destination: "https://agent-factory-smoky.vercel.app/_next/static/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
