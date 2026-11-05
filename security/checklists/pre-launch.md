# Pre-launch security checklist

Tick every item before pointing the production domain at the server.

## Infrastructure
- [ ] SSH: key-only, root login off, `AllowUsers deploy` (`firewall/sshd-hardening.conf`)
- [ ] UFW + DOCKER-USER rules applied; `nmap` from outside shows only 80/443, and only via Cloudflare
- [ ] fail2ban running; unattended-upgrades enabled
- [ ] Cloudflare: proxied DNS, Full (strict), WAF + rate rules from `cloudflare/rules.md`
- [ ] Origin certificate installed; direct-to-IP requests fail
- [ ] `docker compose ps` — all healthy; Postgres/Redis have no published ports

## Application
- [ ] `.env` filled; app boots (env validation passes); no secrets in git history (`gitleaks detect`)
- [ ] securityheaders.com grade A+; CSP has no `unsafe-inline` for scripts
- [ ] `npm audit --omit=dev` — no high/critical
- [ ] Rate limits verified (429 after limit) on every POST endpoint
- [ ] `/club`, `/admin`, `/account` refuse signed-out and wrong-role users (server-side, not just proxy)
- [ ] Admin accounts have 2FA enforced
- [ ] Razorpay: live keys only in `.env`; webhook signature verified; test-mode keys removed

## Data & compliance
- [ ] Privacy notice, terms, disclaimer, refunds reviewed by a lawyer; placeholders removed
- [ ] Consent captured and logged at sign-up and newsletter
- [ ] Data export and account deletion work end-to-end
- [ ] Education-only notice on every AI-trading, Web3 and club page
- [ ] Backups running nightly; one restore test logged in `backups/restore-test-log.md`
- [ ] Incident contacts filled in `incident-response.md`

## Assurance
- [ ] Independent penetration test done; all high/critical findings fixed and re-tested
- [ ] `security.txt` contact and expiry updated
