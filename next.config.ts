/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/svg/**',
      },
      {
        protocol: 'https',
        hostname: 'skill-svg-server.vercel.app',
        pathname: '/svg/**',
      },
      // ✅ Add this new pattern for stack-symbols
      {
        protocol: 'https',
        hostname: 'stack-symbols.vercel.app',
        pathname: '/svg/**',
      },
    ],
  },
};

module.exports = nextConfig;
