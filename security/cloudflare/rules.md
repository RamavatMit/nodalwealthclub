# Cloudflare configuration (as code)

Apply in the Cloudflare dashboard, or with Terraform later. Keep this file in sync with what is live.

## SSL/TLS
- Mode: **Full (strict)**. Origin uses a Cloudflare Origin Certificate (`security/caddy/certs/origin.pem` + `origin.key`, 15-year, never committed).
- Minimum TLS version 1.2 at the edge, TLS 1.3 enabled; Always Use HTTPS on; HSTS on (6 months to start, then 2 years + preload once stable).
- Authenticated Origin Pulls: on (optional extra lock so only Cloudflare can talk to Caddy).

## DNS
- `A @` and `CNAME www` → **proxied** (orange cloud). No unproxied records point at the VPS IP.
- Do not publish the VPS IP anywhere (email headers, other subdomains).

## WAF custom rules (in order)
| # | Expression | Action | Why |
| --- | --- | --- | --- |
| 1 | `(http.request.uri.path wildcard "/admin*") and not ip.src in $admin_ips` | Block | Admin only from known IPs |
| 2 | `(http.request.uri.path wildcard "/wp-*") or (http.request.uri.path contains ".php") or (http.request.uri.path contains "/.env") or (http.request.uri.path contains "/.git")` | Block | Common scanner paths; we run neither |
| 3 | `(http.request.uri.path in {"/login" "/signup"} and http.request.method eq "POST") and cf.threat_score gt 10` | Managed Challenge | Credential-stuffing friction |
| 4 | `(cf.client.bot) eq false and http.user_agent eq ""` | Block | Empty user agents |

Managed rules: **Cloudflare Managed Ruleset** and **OWASP Core Ruleset** on (OWASP paranoia level 1, action: block above score threshold "medium").

## Rate limiting rules
| Path | Limit | Action |
| --- | --- | --- |
| `/api/*` (POST) | 30 req / 1 min / IP | Block 10 min |
| `/login`, `/signup` (POST) | 10 req / 1 min / IP | Managed Challenge |
| `/api/webhooks/*` | Skip (Razorpay IPs allow-listed in Phase 3) | — |

These sit in front of the app's own Redis limits (`src/lib/security/rate-limit.ts`); both layers stay on.

## Bots & DDoS
- Bot Fight Mode on (or Super Bot Fight Mode on paid plans: definitely automated → block, likely automated → challenge, verified bots → allow).
- HTTP DDoS attack protection: default sensitivity high.
- Turnstile site for login, sign-up and contact forms (Phase 3).

## Caching
- Cache rule: `/_next/static/*` → cache everything, edge TTL 1 year.
- HTML is rendered per request (nonce CSP) → bypass cache for everything else.
