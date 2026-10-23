import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // The concept site's gallery lives at /work now.
  async redirects() {
    return [{ source: "/gallery", destination: "/work", permanent: true }];
  },
  experimental: {
    // Two root layouts ((swanky) and the internal (ops) preview) need a global 404.
    globalNotFound: true,
  },
};

export default nextConfig;
