/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["myappb9e5bf8a16d6479fb9c5496331b4394e141019-dev"],
    remotePatterns: [
      {
        hostname:
          "myappb9e5bf8a16d6479fb9c5496331b4394e141019-dev.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};
