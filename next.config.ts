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
    ],
  },
};

module.exports = nextConfig;
