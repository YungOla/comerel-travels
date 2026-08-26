/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;
