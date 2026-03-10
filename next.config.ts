import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Optimize package imports (tree-shaking)
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Redirect root to default locale (Polish)
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pl",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
