import type { NextConfig } from "next";
import { staticSecurityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  // Standalone output keeps the Docker image small (see Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // Cache Components / PPR are intentionally off: the nonce-based CSP in
  // src/proxy.ts needs every page rendered per request so scripts carry the nonce.
  turbopack: {
    // Points next-intl at our request config. Done directly instead of via
    // next-intl/plugin, which loads @swc/core natively at config time.
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The AI hub was reorganised into sections; keep old article links working.
  async redirects() {
    return [
      { source: "/ai/knowledge", destination: "/ai/how-ai-works", permanent: true },
      { source: "/ai/tools", destination: "/ai/ai-tools-market-map", permanent: true },
      { source: "/ai/trading", destination: "/ai/trading-with-agents", permanent: true },
      { source: "/ai/in-your-field", destination: "/ai/ai-tools-market-map", permanent: true },
      { source: "/ai/careers", destination: "/ai/why-learn-ai-tools", permanent: true },
      { source: "/ai/updates", destination: "/ai#news", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: staticSecurityHeaders() }];
  },
};

export default nextConfig;
