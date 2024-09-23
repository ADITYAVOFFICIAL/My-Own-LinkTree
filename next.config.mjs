/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['srmsigkdd-cdn.netlify.app'],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/_next/static/:path*',
          destination: '/_next/static/:path*',
          has: [
            {
              type: 'header',
              key: 'If-None-Match',
              value: '(.*)',
            },
          ],
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/_next/static/:path*',
          destination: '/_next/static/:path*',
          has: [
            {
              type: 'header',
              key: 'If-None-Match',
              value: '(.*)',
            },
          ],
          permanent: false,
        },
      ];
    },
    async generateBuildId() {
      // Return a unique build ID to invalidate cache when changes are detected
      return 'build-' + new Date().getTime();
    },
  };
  
  export default nextConfig;