# Nodal Wealth Club

Financial-future literacy for India: AI, Web3 and agentic systems explained in plain language, with real products and a private members' club. **Education only — never investment advice.**

**Status: Phase 1 (foundation) complete.** All copy marked `PLACEHOLDER` on the site awaits real content.

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

No database or Redis is needed for Phase 1 development; rate limits fall back to memory.

| Script                                                  | What it does                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`                                           | Dev server (Turbopack)                                                 |
| `npm run build` / `npm start`                           | Production build / serve                                               |
| `npm run lint` · `npm run typecheck` · `npm run format` | Quality checks                                                         |
| `npm test`                                              | Unit tests (Vitest) — security, rate limiting, env, schemas            |
| `npx playwright test`                                   | E2E smoke tests against a production build (run `npm run build` first) |
| `node scripts/screenshots.mjs`                          | Full-page desktop + mobile screenshots → `docs/screenshots/`           |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Motion · GSAP ScrollTrigger · Lenis · next-intl · Zod · ioredis · Vitest · Playwright. Later phases add PostgreSQL + Prisma/Drizzle, Payload CMS, Better Auth / Auth.js, Razorpay, Socket.io, wagmi/viem + SIWE, Bunny Stream, Resend, Sentry.

## Structure

```
src/
  app/                    routes: / about membership ai web3 products contact login legal/* api/*
  components/
    motion/               reusable animation library (intro, page transitions, reveals, marquee,
                          counters, parallax, pinned carousel, node network, money timeline)
    ui/                   buttons, Join badge, logo, sections, education notice, placeholders
    layout/               header, footer, newsletter form, legal and coming-soon layouts
    home/                 Future-ready score quiz
  content/placeholder.ts  Phase 1 sample content (moves to the CMS in Phase 2)
  lib/security/           headers/CSP, rate limiting, env validation, Zod schemas (+ tests)
  proxy.ts                per-request CSP nonce + early gate for /club /admin /account
  i18n/request.ts         next-intl config (English now; Hindi/Gujarati ready)
messages/en.json          UI strings
security/                 infra & policy: Caddy, firewall, Docker, backups, Cloudflare, checklists,
                          SECURITY.md, incident-response.md (see security/README.md)
e2e/                      Playwright smoke tests
```

## Design system

Tokens live in `src/app/globals.css` as CSS variables and Tailwind colours. Backgrounds are always beige (`ivory paper sand linen`, borders `line`); highlights use the logo greens (`forest` #1B7A52 for buttons, accents and active states · `mint` #8CCBAE for soft highlights and glows · `emerald` #24A06B for badges and dots · `jade` #2F8F5F for success and charts); text is `ink` / `ink-muted`. Fonts: Instrument Serif (display, one italic accent word — write `*word*` in `WordRise` titles), Geist (UI), Geist Mono (numbers). Corners 2–4 px; the only round element is the Join badge.

## Animation notes
- **Intro film** (`src/components/intro/`): a full-screen, ~52 s animated film (9 chapters, wipe cuts, camera push-ins, film grain, auto-hiding player). It plays automatically on a visitor's **first ever visit to Home**, then lifts away into the Home page. Skip / Esc at any time. Always available at `/intro`. To see the first-visit version again, open a private window or run `localStorage.removeItem("nwc-film")` in the browser console.

- **Intro** plays once per browser session, pure CSS (≤1.6 s), skippable, off for reduced motion.
- **Page transitions** use React's `<ViewTransition>` from `app/template.tsx`; `TransitionLink` tags each navigation as `page-forward` or `page-back`. Browsers without the View Transitions API swap instantly.
- **Reduced motion:** `MotionConfig reducedMotion="user"`, Lenis and the pinned carousel switch off, the node network draws one still frame.

## Compliance rules (non-negotiable)

Education only; no buy/sell calls, price targets or performance claims · no live/recent price data as examples · wallets read-only, never signatures for transactions, keys or seed phrases · balances private, community stats anonymised and aggregated · membership in INR via Razorpay only · DPDP consent, export, deletion and breach playbook.

## Adding a language

Add `messages/hi.json`, extend `locales` in `src/i18n/request.ts`, and move routes under `app/[locale]/` with next-intl's routing middleware merged into `src/proxy.ts`.

## Deploying

See [DEPLOY.md](DEPLOY.md).
