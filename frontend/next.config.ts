import type { NextConfig } from "next";

console.log('BUILD VARS:', {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_INTERNAL_API_URL: process.env.NEXT_INTERNAL_API_URL,
});

const nextConfig: NextConfig = {};

export default nextConfig;
