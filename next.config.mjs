// Next.js configuration with TypeScript type checking
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Define domains for optimized image loading
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'narumiem.org',
      },
    ],
  },
  
};

export default nextConfig;
