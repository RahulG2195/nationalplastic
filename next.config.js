/** @type {import('next').NextConfig} */

const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['localhost', 'nationalplastic.com'],
  },

};


module.exports = nextConfig;

