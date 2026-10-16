import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@solara/contracts"],
  turbopack: { root: workspaceRoot },
  outputFileTracingRoot: workspaceRoot,
};

export default nextConfig;
