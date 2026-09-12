import "./patch-fs.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.BUILD_DIR || ".next",
  turbopack: {
    root: process.cwd(),
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    if (config.resolveLoader) {
      config.resolveLoader.symlinks = false;
    }
    return config;
  },
};

export default nextConfig;
