# Incident response playbook

Use this for any suspected breach, account takeover, data leak, defacement or payment anomaly. Speed matters more than perfection; write everything down as you go.

**Incident lead:** <PLACEHOLDER> · **Backup:** <PLACEHOLDER> · **Grievance officer (DPDP):** <PLACEHOLDER>

## 1. Detect and open (first 15 minutes)
- Create a private incident note with a timestamped log (UTC + IST).
- Record: what was noticed, by whom, when, which systems.
- Severity: **SEV1** personal data or money exposed / site compromised · **SEV2** service down or partial exposure suspected · **SEV3** contained bug, no data exposure.

## 2. Contain (first hour)
- Rotate the affected secrets in `.env` (Razorpay, Auth, Redis, DB app password, field-encryption key **only** with a planned re-encryption) and restart: `docker compose up -d`.
- Revoke all sessions if accounts may be affected (Phase 3: admin → "log out everyone").
- Cloudflare: enable "Under Attack" mode, block offending IPs/ASNs, tighten WAF rules.
- If the server itself is compromised: snapshot the VPS for forensics, then rebuild from a clean image and the last good backup — do not "clean" a compromised host.
- Take the site into maintenance mode if data is still leaking.

## 3. Assess
- Which personal data (emails, phones, wallet addresses, chat), how many people, which time window.
- Pull audit logs, Caddy logs, Sentry, Cloudflare security events. Preserve copies.
- Check Razorpay dashboard for unexpected refunds, payouts or API key use.

## 4. Notify (DPDP Rules 2025)
For a personal data breach, the Data Fiduciary must:
- **Without delay**, inform each affected person: what happened, likely consequences, what we are doing, what they should do, and a contact.
- **Without delay**, send an initial intimation to the **Data Protection Board of India**, and a **detailed report within 72 hours** of becoming aware (or longer if the Board allows): facts, cause, mitigation, findings about the person responsible, remedial steps, and notifications sent.
- Check whether CERT-In reporting (6 hours for listed incident types) applies.
- Razorpay: notify if payment flows or keys are involved.

> Confirm current deadlines with counsel; the Rules' operational duties become enforceable around 13 May 2027 but follow them from day one.

### Template — notice to affected members
> **Subject: Important: a security incident affecting your Nodal Wealth Club account**
>
> On [date], we discovered [plain description]. The information involved was [list]. **Your card, UPI and bank details were not affected — we never hold them — and we never hold seed phrases or private keys.**
>
> What we have done: [containment steps]. What you can do: [e.g. watch for phishing emails pretending to be us; we will never ask for OTPs, passwords or seed phrases].
>
> Questions: [grievance officer contact]. We are sorry this happened.

### Template — intimation to the Data Protection Board
> Data Fiduciary: [entity, address, contact] · Date/time of awareness: [ ] · Nature and extent of breach: [ ] · Timing and location: [ ] · Likely impact on Data Principals: [ ] · Approximate number affected: [ ] · Measures taken / proposed: [ ] · Notifications made to Data Principals: [ ]

## 5. Recover
- Restore from backup if data integrity is in doubt (`backups/restore.sh`).
- Deploy the fix; verify with a targeted test; watch logs for recurrence for 7 days.

## 6. Learn (within 2 weeks)
- Blameless write-up: timeline, root cause, what worked, what didn't.
- Add tests, rules or checklist items so it can't recur. Update this playbook.
