/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './cfImageLoader.js'
  },
  swcMinify: true,
  experimental: {
    runtime: 'experimental-edge'
  }
}

module.exports = nextConfig
