/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thaimerry.co.th",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
