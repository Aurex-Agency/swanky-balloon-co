import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Two root layouts ((concept) and (swanky)) during the redesign need a global 404.
    globalNotFound: true,
  },
};

export default nextConfig;
