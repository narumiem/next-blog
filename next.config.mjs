// Next.js configuration with TypeScript type checking
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Define domains for optimized image loading
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'narumiem.org',
      },
      {
        protocol: 'https',
        hostname: '192.168.1.2',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
