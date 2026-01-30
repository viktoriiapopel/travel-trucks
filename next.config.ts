import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ["ftp.goit.study"],
  },
};

export default nextConfig;

