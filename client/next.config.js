/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.licdn.com", 
      "img.freepik.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
