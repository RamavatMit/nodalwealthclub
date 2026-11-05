import type { MetadataRoute } from "next";
import { news } from "@/content/news";
import { products } from "@/content/products";
import { aiTopics, web3Topics } from "@/content/topics";
import { getEnv } from "@/lib/security/env";

// SITE_URL is only known at runtime (Docker builds without it).
export const dynamic = "force-dynamic";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/intro", priority: 0.7 },
  { path: "/ai", priority: 0.9 },
  { path: "/web3", priority: 0.9 },
  { path: "/products", priority: 0.8 },
  { path: "/membership", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.4 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/terms", priority: 0.2 },
  { path: "/legal/disclaimer", priority: 0.2 },
  { path: "/legal/refunds", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getEnv().SITE_URL;
  const details = [
    ...aiTopics.map((t) => ({ path: `/ai/${t.slug}`, priority: 0.7 })),
    ...web3Topics.map((t) => ({ path: `/web3/${t.slug}`, priority: 0.7 })),
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.7 })),
    ...news.filter((n) => !n.sample).map((n) => ({ path: `/${n.hub}/news/${n.slug}`, priority: 0.6 })),
  ];
  return [...ROUTES, ...details].map((r) => ({ url: `${site}${r.path}`, priority: r.priority }));
}
