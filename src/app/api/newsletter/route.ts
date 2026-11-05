import { NextResponse, type NextRequest } from "next/server";
import { getEnv } from "@/lib/security/env";
import { clientKey, rateLimit, rateLimitHeaders, RULES } from "@/lib/security/rate-limit";
import { newsletterSchema } from "@/lib/security/schemas";

/**
 * POST /api/newsletter
 *
 * Phase 1: validates, rate-limits and accepts the signup. Persistence (the
 * NewsletterSubscriber + Consent records in Postgres) and the double opt-in
 * email (Resend) are wired in Phase 3; until then nothing is stored.
 */
export async function POST(request: NextRequest) {
  // CSRF: browsers always send Origin on cross-site POSTs; only our own site may call this.
  const origin = request.headers.get("origin");
  const allowed = new Set([request.nextUrl.origin, new URL(getEnv().SITE_URL).origin]);
  if (origin && !allowed.has(origin)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const limit = await rateLimit(await clientKey(request.headers), RULES.newsletter);
  if (!limit.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: rateLimitHeaders(limit) });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 400, headers: rateLimitHeaders(limit) },
    );
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  // TODO(phase-3): upsert NewsletterSubscriber (encrypted email + lookup hash),
  // write a Consent record, and send the confirmation email.
  return NextResponse.json({ ok: true }, { status: 202, headers: rateLimitHeaders(limit) });
}
