/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/python/fastapi/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/python/fastapi/:path*'
            : '/api/python/fastapi/'
      }
    ];
  }
};

module.exports = nextConfig;
