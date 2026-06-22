import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Disable legacy polyfills for modern browsers
  // This removes ~43 KiB of unnecessary polyfills (Array.at, Object.fromEntries, etc.)


  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uowlmoevtvziiutzzzpv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Enable modern image formats for better compression
    formats: ["image/avif", "image/webp"],
  },

  reactStrictMode: true,
};

export default nextConfig;