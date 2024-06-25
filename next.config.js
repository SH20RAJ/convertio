const { default: withPWAInit } = require('@ducanh2912/next-pwa');

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // Use the custom service worker
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // other next.js config options here
};

module.exports = withPWA(nextConfig);
