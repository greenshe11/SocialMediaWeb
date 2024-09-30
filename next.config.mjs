/** @type {import('next').NextConfig} */
const nextConfig = {};

//export default nextConfig;

// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/api/socket',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};