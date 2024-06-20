/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s-light.tiket.photos",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets-bucket.tiket.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
