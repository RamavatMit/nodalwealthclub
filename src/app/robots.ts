import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/security/env";

// SITE_URL is only known at runtime (Docker builds without it).
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const site = getEnv().SITE_URL;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/club", "/admin", "/account", "/api", "/login"] }],
    sitemap: `${site}/sitemap.xml`,
  };
}
