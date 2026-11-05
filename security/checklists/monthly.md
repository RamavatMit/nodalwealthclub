# Monthly security checklist

Copy into an issue on the first Monday of each month.

- [ ] Restore test: latest backup restored into `nodal_restore_test`; logged
- [ ] Merge or triage Dependabot PRs; `npm audit --omit=dev` clean
- [ ] Rebuild images to pick up base-image patches (`docker compose build --pull && docker compose up -d`)
- [ ] Review Cloudflare security events and WAF hits; adjust rules
- [ ] Review audit log: admin role changes, unusual logins, bulk exports
- [ ] Review list of admins/moderators; remove anyone who no longer needs access
- [ ] Check TLS/origin cert expiry and `security.txt` Expires date
- [ ] Check disk space, backup bucket size, and that old backups are being pruned
- [ ] Spot-check five recent blog posts for compliance (no calls, no return claims, reviewed date shown)
