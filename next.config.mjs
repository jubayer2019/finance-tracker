/** @type {import('next').NextConfig} */
const nextConfig = {
  // The frontend talks to the API server directly via NEXT_PUBLIC_API_URL with
  // credentialed (cookie) requests, so no rewrite proxy is needed.
};

export default nextConfig;
