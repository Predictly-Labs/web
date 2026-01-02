import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  turbopack: {},
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'gsap', 'sonner'],
  },
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    config.externals = [...(config.externals || []), {
      keyv: 'keyv'
    }];
    return config;
  },
};

export default nextConfig;
