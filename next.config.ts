import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are served straight from Unsplash's CDN (it resizes + converts format),
    // so the custom loader just rewrites w/h/q. No Vercel image optimisation needed.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    qualities: [60, 70, 75, 80],
  },
  // Keep the old static URLs working (links already shared, search results, etc.)
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/booking.html", destination: "/booking", permanent: true },
    ];
  },
};

export default nextConfig;
