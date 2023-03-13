/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './cfImageLoader.js'
  },
  experimental: {
    runtime: 'edge'
  }
}

module.exports = nextConfig
