import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/', // The starting page
        destination: '/Cliente', // The target page
        permanent: true, // Set to `true` for permanent redirects
      },
    ];
  },
};

export default nextConfig;
