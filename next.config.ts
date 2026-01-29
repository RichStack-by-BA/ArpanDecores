/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'arpan-image-bucket.s3.eu-north-1.amazonaws.com',
      'arpan-image-bucket.s3.amazonaws.com',
      'example.com'
    ],
  },
};

module.exports = nextConfig;
