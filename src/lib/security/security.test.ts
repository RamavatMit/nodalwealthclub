import { describe, expect, it } from "vitest";
import { configWarnings, getEnv } from "./env";
import { buildCsp, createNonce, staticSecurityHeaders } from "./headers";
import { checkMemory } from "./rate-limit";
import { newsletterSchema } from "./schemas";

describe("CSP", () => {
  const prod = buildCsp({ nonce: "abc123", isDev: false });

  it("allows scripts only by nonce in production", () => {
    expect(prod).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(prod).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(prod).not.toContain("'unsafe-eval'");
  });

  it("blocks framing, plugins and foreign form posts", () => {
    expect(prod).toContain("frame-ancestors 'none'");
    expect(prod).toContain("object-src 'none'");
    expect(prod).toContain("form-action 'self'");
    expect(prod).toContain("upgrade-insecure-requests");
  });

  it("only allows eval in development", () => {
    expect(buildCsp({ nonce: "x", isDev: true })).toContain("'unsafe-eval'");
  });

  it("creates unpredictable nonces", () => {
    const a = createNonce();
    const b = createNonce();
    expect(a).not.toEqual(b);
    expect(atob(a)).toHaveLength(16);
  });

  it("sets HSTS, nosniff and clickjacking headers", () => {
    const keys = staticSecurityHeaders().map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "Referrer-Policy",
        "Permissions-Policy",
      ]),
    );
  });
});

describe("rate limiter (in-memory)", () => {
  const rule = { name: "t", limit: 3, windowSeconds: 60 };

  it("allows up to the limit then blocks", () => {
    const key = `k-${Math.random()}`;
    const t = 1_000_000;
    expect(checkMemory(key, rule, t).ok).toBe(true);
    expect(checkMemory(key, rule, t + 1).ok).toBe(true);
    const third = checkMemory(key, rule, t + 2);
    expect(third.ok).toBe(true);
    expect(third.remaining).toBe(0);
    const fourth = checkMemory(key, rule, t + 3);
    expect(fourth.ok).toBe(false);
    expect(fourth.retryAfter).toBe(60);
  });

  it("slides: old hits expire out of the window", () => {
    const key = `k-${Math.random()}`;
    const t = 2_000_000;
    for (let i = 0; i < 3; i++) checkMemory(key, rule, t);
    expect(checkMemory(key, rule, t + 30_000).ok).toBe(false);
    expect(checkMemory(key, rule, t + 60_001).ok).toBe(true);
  });
});

describe("env validation", () => {
  it("accepts a minimal development env", () => {
    expect(() => getEnv({ NODE_ENV: "development" } as NodeJS.ProcessEnv)).not.toThrow();
  });

  it("starts in production without Redis or a salt, and warns about both", () => {
    const env = getEnv({ NODE_ENV: "production" } as NodeJS.ProcessEnv);
    const warnings = configWarnings(env).join(" | ");
    expect(warnings).toContain("REDIS_URL");
    expect(warnings).toContain("RATE_LIMIT_SALT");
  });

  it("still fails fast on malformed production values", () => {
    expect(() => getEnv({ NODE_ENV: "production", REDIS_URL: "http://nope" } as NodeJS.ProcessEnv)).toThrow(
      /REDIS_URL/,
    );
  });

  it("rejects a malformed encryption key without printing it", () => {
    try {
      getEnv({ NODE_ENV: "development", FIELD_ENCRYPTION_KEY: "secret-but-short" } as NodeJS.ProcessEnv);
      expect.unreachable();
    } catch (e) {
      expect(String(e)).toContain("FIELD_ENCRYPTION_KEY");
      expect(String(e)).not.toContain("secret-but-short");
    }
  });
});

describe("newsletter schema", () => {
  it("normalises email and requires consent", () => {
    const ok = newsletterSchema.safeParse({ email: "  Asha@Example.IN ", consent: true });
    expect(ok.success && ok.data.email).toBe("asha@example.in");
    expect(newsletterSchema.safeParse({ email: "asha@example.in", consent: false }).success).toBe(false);
  });

  it("rejects bad emails and unknown sources", () => {
    expect(newsletterSchema.safeParse({ email: "nope", consent: true }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "a@b.in", consent: true, source: "evil" }).success).toBe(
      false,
    );
  });
});

describe("env blanks", () => {
  it("treats empty values as unset", () => {
    expect(() =>
      getEnv({ NODE_ENV: "development", SENTRY_DSN: "", FIELD_ENCRYPTION_KEY: "" } as NodeJS.ProcessEnv),
    ).not.toThrow();
  });
});
