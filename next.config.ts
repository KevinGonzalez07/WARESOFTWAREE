import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // experimental: {
//   appDir: true
// }
}

export default nextConfig