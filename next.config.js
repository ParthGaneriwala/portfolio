const optimize = require("next/dist/server/optimize-amp");
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/",
  output: "export",  // <=== enables static exports
  images: {
    unoptimized: true
  },
  reactStrictMode: true,

};

module.exports = nextConfig;