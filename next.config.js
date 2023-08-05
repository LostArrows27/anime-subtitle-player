/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
      {
        protocol: "https",
        hostname: "e0.pxfuel.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};
