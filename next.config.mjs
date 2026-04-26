/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Shopify CDN — for when COMMERCE_PROVIDER=shopify
      { protocol: "https", hostname: "cdn.shopify.com" },
      // Cloudinary — for marketing assets
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Unsplash — placeholder photography during build
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
