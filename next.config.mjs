/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Whenever the frontend pings its own /api/auth, intercept it
        source: '/api/auth/:path*',
        // Route it silently behind the scenes to the backend serverless instance
        destination: 'https://finance-tracker-server-eta.vercel.app/api/auth/:path*',
      },
      {
        source: '/api/transactions/:path*',
        destination: 'https://finance-tracker-server-eta.vercel.app/api/transactions/:path*',
      },
    ];
  },
};

export default nextConfig;