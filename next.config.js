/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './cfImageLoader.js'
  }
}

module.exports = nextConfig
