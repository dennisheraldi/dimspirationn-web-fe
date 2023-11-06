/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['strapi-xp0x.onrender.com']
  }
};

module.exports = nextConfig;
