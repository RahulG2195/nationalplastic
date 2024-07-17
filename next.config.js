/** @type {import('next').NextConfig} */

const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  source: "/favicon.ico",
  headers: [
    {
      key: "Cache-Control",
      value: "public, max-age=86400, must-revalidate",
    },
  ]
};


module.exports = nextConfig;

