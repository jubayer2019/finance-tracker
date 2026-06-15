/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Whenever the frontend pings its own /api path...
        source: '/api/:path*',
        // ...silently forward it to your external backend URL
        destination: 'https://finance-tracker-server-eta.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;