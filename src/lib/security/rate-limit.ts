import Redis from "ioredis";
import { getEnv } from "./env";

/**
 * Sliding-window rate limiter.
 *
 * Production: Redis sorted set per key, updated atomically with a Lua script so
 * concurrent requests across web containers share one count.
 * Development/tests without REDIS_URL: an in-memory window (single process only).
 */

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the oldest hit leaves the window. */
  retryAfter: number;
};

export type RateLimitRule = {
  /** Namespace, e.g. "newsletter" or "login". */
  name: string;
  limit: number;
  windowSeconds: number;
};

export const RULES = {
  newsletter: { name: "newsletter", limit: 5, windowSeconds: 60 * 10 },
  form: { name: "form", limit: 10, windowSeconds: 60 * 10 },
  api: { name: "api", limit: 60, windowSeconds: 60 },
} satisfies Record<string, RateLimitRule>;

const SLIDING_WINDOW_LUA = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local count = redis.call('ZCARD', key)
local added = 0
if count < limit then
  redis.call('ZADD', key, now, member)
  count = count + 1
  added = 1
end
redis.call('PEXPIRE', key, window)
local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
return { added, count, oldest[2] or tostring(now) }
`;

let redis: Redis | null | undefined;

/** Fallback salt when RATE_LIMIT_SALT is unset: random, never written anywhere. */
const processSalt = crypto.randomUUID();

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const { REDIS_URL: url, RATE_LIMIT_STORE } = getEnv();
  redis =
    url && RATE_LIMIT_STORE !== "memory"
      ? new Redis(url, { maxRetriesPerRequest: 2, enableOfflineQueue: false })
      : null;
  return redis;
}

const memory = new Map<string, number[]>();

export function checkMemory(key: string, rule: RateLimitRule, now = Date.now()): RateLimitResult {
  const windowMs = rule.windowSeconds * 1000;
  const hits = (memory.get(key) ?? []).filter((t) => t > now - windowMs);
  const allowed = hits.length < rule.limit;
  if (allowed) hits.push(now);
  memory.set(key, hits);
  const oldest = hits[0] ?? now;
  return {
    ok: allowed,
    limit: rule.limit,
    remaining: Math.max(0, rule.limit - hits.length),
    retryAfter: allowed ? 0 : Math.ceil((oldest + windowMs - now) / 1000),
  };
}

export async function rateLimit(identifier: string, rule: RateLimitRule): Promise<RateLimitResult> {
  const key = `rl:${rule.name}:${identifier}`;
  const client = getRedis();
  if (!client) return checkMemory(key, rule);

  const now = Date.now();
  const windowMs = rule.windowSeconds * 1000;
  try {
    const [added, count, oldest] = (await client.eval(
      SLIDING_WINDOW_LUA,
      1,
      key,
      now,
      windowMs,
      rule.limit,
      `${now}-${crypto.randomUUID()}`,
    )) as [number, number, string];
    const ok = added === 1;
    return {
      ok,
      limit: rule.limit,
      remaining: Math.max(0, rule.limit - count),
      retryAfter: ok ? 0 : Math.ceil((Number(oldest) + windowMs - now) / 1000),
    };
  } catch {
    // Fail closed for abuse-prone endpoints rather than letting floods through.
    return { ok: false, limit: rule.limit, remaining: 0, retryAfter: 30 };
  }
}

/**
 * Client identifier from the request. Behind Cloudflare the real IP is in
 * CF-Connecting-IP; Caddy forwards it. The IP is hashed with a salt so raw
 * addresses are never written to Redis.
 */
export async function clientKey(headers: Headers): Promise<string> {
  const ip =
    headers.get("cf-connecting-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown";
  const salt = getEnv().RATE_LIMIT_SALT ?? processSalt;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
  return Buffer.from(digest).toString("base64url").slice(0, 22);
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    ...(result.ok ? {} : { "Retry-After": String(result.retryAfter) }),
  };
}
