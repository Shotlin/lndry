import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Blog cover images are served from the Supabase Storage "blog-images" bucket.
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/blog-images/**" },
    ],
  },
};

export default nextConfig;
