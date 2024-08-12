/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["localhost", "nationalplastic.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nationalplastic.com",
        pathname: "/uploads/**",
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },

  //   webpack: (config) => {
  //     config.resolve.alias["@uploads"] = path.resolve("/var/www/uploads");
  //     return config;
  //   },
  webpack: (config, { dev, isServer }) => {
    // Add alias
    config.resolve.alias["@uploads"] = path.resolve("/var/www/uploads");

    // Add image handling rules
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            publicPath: "/_next/static/",
            outputPath: "static/",
          },
        },
        {
          loader: "string-replace-loader",
          options: {
            search: /(\s|\+|%20)\.(JPG|JPEG|PNG|GIF|WEBP)$/i,
            replace: (match, space, ext) => `${space}${ext.toLowerCase()}`,
            flags: "g",
          },
        },
      ],
    });

    return config;
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
};
module.exports = nextConfig;
