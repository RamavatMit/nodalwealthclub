import { NextResponse } from "next/server";

/** Liveness probe for Docker and uptime monitoring. Reveals nothing internal. */
export function GET() {
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
