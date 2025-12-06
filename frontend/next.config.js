/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to enable server-side features for auth
  images: {
    unoptimized: true
  },
  // Configure path alias for @/ imports
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    return config
  }
}

module.exports = nextConfig
