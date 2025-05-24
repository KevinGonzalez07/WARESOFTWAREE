import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // elimina "swcMinify"; la minificación por SWC está activada por defecto
}

export default nextConfig