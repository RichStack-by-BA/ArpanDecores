/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arpan-image-bucket.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'arpan-image-bucket.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-bb71d5600a844da788b62e6f3b50d0dc.r2.dev',
      },
    ],
  },
};

module.exports = nextConfig;
