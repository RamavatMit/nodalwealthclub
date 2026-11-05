import { z } from "zod";

/**
 * All server secrets are read through here and validated once at startup
 * (see src/instrumentation.ts). Never import this file from a client component.
 *
 * Variables for later phases are optional now and become required in the
 * phase that introduces them.
 */
const isProd = process.env.NODE_ENV === "production";

const schema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    SITE_URL: z.url().default("http://localhost:3000"),

    // Phase 1
    REDIS_URL: z.string().startsWith("redis").optional(),
    /** "memory" is for single-process test runs only (e2e). */
    RATE_LIMIT_STORE: z.enum(["redis", "memory"]).optional(),
    RATE_LIMIT_SALT: z.string().min(16).optional(),

    // Phase 2–4 (validated when present)
    DATABASE_URL: z.string().startsWith("postgres").optional(),
    FIELD_ENCRYPTION_KEY: z
      .string()
      .regex(/^[A-Za-z0-9+/]{43}=$/, "must be 32 bytes, base64")
      .optional(),
    AUTH_SECRET: z.string().min(32).optional(),
    RAZORPAY_KEY_ID: z.string().optional(),
    RAZORPAY_KEY_SECRET: z.string().optional(),
    RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
    TURNSTILE_SECRET_KEY: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    SENTRY_DSN: z.url().optional(),
  })
  .superRefine((env, ctx) => {
    // Runtime-only requirements; `next build` runs with NODE_ENV=production
    // but has no access to the production services.
    if (env.NODE_ENV !== "production" || process.env.NEXT_PHASE === "phase-production-build") return;
    if (!env.RATE_LIMIT_SALT) {
      ctx.addIssue({ code: "custom", path: ["RATE_LIMIT_SALT"], message: "required in production" });
    }
    if (env.RATE_LIMIT_STORE !== "memory" && !env.REDIS_URL) {
      ctx.addIssue({ code: "custom", path: ["REDIS_URL"], message: "required in production" });
    }
  });

export type Env = z.infer<typeof schema>;

let cached: Env | undefined;

export function getEnv(source: NodeJS.ProcessEnv = process.env): Env {
  if (cached && source === process.env) return cached;
  // Blank lines in .env (e.g. `SENTRY_DSN=`) mean "not set".
  const present = Object.fromEntries(Object.entries(source).filter(([, v]) => v !== undefined && v !== ""));
  const parsed = schema.safeParse(present);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    // Values are never printed, only names.
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  if (source === process.env) cached = parsed.data;
  return parsed.data;
}

export { isProd };
