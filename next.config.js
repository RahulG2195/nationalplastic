/** @type {import('next').NextConfig} */

const nextConfig = {
  //   reactStrictMode: false,
  // output:'export',
  // runtime: 'nodejs',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // // images:{
  //     unoptimized:true,
  // },
  source: "/favicon.ico",
  headers: [
    {
      key: "Cache-Control",
      value: "public, max-age=86400, must-revalidate",
    },
  ],
};

// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig;
//changed during
