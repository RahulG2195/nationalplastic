/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["localhost", "nationalplastic.com", "lh3.googleusercontent.com"], // Added Google profile images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nationalplastic.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      }
    ],
  },

  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
    // Add this to ensure NextAuth callbacks work properly
    externalResolver: true,
  },

  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve("/var/www/uploads");
    return config;
  },

  // Updated headers configuration
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Add these headers for NextAuth
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; frame-src 'self' https://accounts.google.com"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;