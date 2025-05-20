import type { NextConfig } from "next";

const nextConfig: NextConfig = {

   typescript: {
    ignoreBuildErrors: true,
  },
  
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes 0-9/*",
          },
        ],
      },
    ];
  },

  // ✅ Allow builds to proceed even if there are ESLint issues
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
