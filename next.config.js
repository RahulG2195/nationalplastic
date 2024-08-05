/** @type {import('next').NextConfig} */

const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['localhost', 'nationalplastic.com'],
  },

  api: {
    bodyParser: {
      sizeLimit: '100mb', // Set this to match your needs
    },
  },
};


module.exports = nextConfig;

