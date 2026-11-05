# Security — how every layer works

**Owner:** <PLACEHOLDER: name> · **Last reviewed:** 9 October 2026 · **Next review:** January 2027

We do not claim the site is "uncrackable". We design for defence in depth, and above all we **store as little sensitive data as possible**: no private keys, no seed phrases, no card or UPI data — ever. What we never store cannot be stolen.

## Layers

| # | Layer | Controls | Lives in |
| --- | --- | --- | --- |
| 1 | **Edge (Cloudflare)** | WAF + OWASP rules, DDoS, bot management, rate rules, Turnstile, VPS IP hidden | `cloudflare/rules.md` |
| 2 | **Host (VPS)** | UFW: 80/443 from Cloudflare only, SSH by key from admin IP only; fail2ban; unattended security updates | `firewall/` |
| 3 | **Containers** | Non-root, read-only FS, no-new-privileges, dropped capabilities, DB/Redis on internal network with no ports | `docker/`, `../docker-compose.yml`, `../Dockerfile` |
| 4 | **Reverse proxy (Caddy)** | TLS 1.3 with Cloudflare origin cert, HSTS, body size limit, header stripping | `caddy/Caddyfile` |
| 5 | **Application** | Nonce-based CSP, security headers, Zod validation on every input, Origin checks on POST, Redis sliding-window rate limits, env validated at boot | `../src/lib/security/`, `../src/proxy.ts` |
| 6 | **Accounts** *(Phase 3)* | Passwordless email OTP / passkeys, TOTP 2FA (mandatory for admins), HTTP-only Secure cookies, session list + log out everywhere, login alerts | `../src/lib/security/session.ts`, `totp.ts` |
| 7 | **Data** *(Phase 2–3)* | AES-256-GCM field encryption for email/phone/wallet + hashed lookup column, Argon2id, least-privilege DB role | `../src/lib/security/encryption.ts`, `docker/postgres-init.sh` |
| 8 | **Wallets** *(Phase 4)* | Sign-In with Ethereum (message signing only), read-only balances, never transaction signing/approvals/keys | `../src/lib/security/siwe.ts` |
| 9 | **Payments** *(Phase 3)* | Razorpay only, confirmed by signed webhooks, store only order/payment IDs | `../src/lib/security/webhook-verify.ts` |
| 10 | **Monitoring & recovery** | Audit log, Sentry, uptime alerts, encrypted nightly off-site backups with monthly restore tests, incident playbook | `backups/`, `incident-response.md` |
| 11 | **Supply chain** | Lockfile, `npm ci`, Dependabot, `npm audit` in CI, no unreviewed packages | `../.github/` |

## Status by phase

| Built in Phase 1 | Planned |
| --- | --- |
| `headers.ts` (CSP with per-request nonces, HSTS, XFO, Referrer/Permissions policies) | `csrf.ts`, `turnstile.ts`, `rbac.ts`, `session.ts`, `totp.ts` — Phase 3 |
| `rate-limit.ts` (Redis sliding window, in-memory fallback in dev) | `encryption.ts`, `hashing.ts`, `audit-log.ts` — Phase 2/3 |
| `env.ts` (Zod-validated secrets, fail fast at boot) | `sanitize.ts` (DOMPurify) — Phase 2 with the CMS |
| `schemas/` (Zod for every form/API so far) | `webhook-verify.ts` — Phase 3; `siwe.ts` — Phase 4 |
| `proxy.ts` optimistic gate for `/club`, `/admin`, `/account` | Server-side role checks inside those routes — Phase 3 |
| Container, firewall, Caddy, Cloudflare, backup configs | Independent penetration test — Phase 6 |

## Adding a third-party service
1. Add its origin to the right CSP directive in `src/lib/security/headers.ts` (never `*`).
2. Add its secret to `env.ts` and `.env.example`.
3. Note it here and in the privacy notice if it receives personal data.
