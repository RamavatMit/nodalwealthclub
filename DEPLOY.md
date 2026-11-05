# Deploying to a Hostinger KVM VPS

Target: Hostinger **KVM 2 or higher**, **Ubuntu 24.04**, India data centre if your plan offers one. Everything runs in Docker Compose behind Cloudflare.

```
Visitor ─▶ Cloudflare (WAF, DDoS, TLS) ─▶ VPS :443 (UFW: Cloudflare IPs only)
                                            └▶ Caddy ─▶ web (Next.js) ─▶ postgres, redis (internal network, no ports)
```

Commands below run on the VPS unless marked **(local)**.

---

## 1. Create the server

1. hPanel → VPS → choose plan → OS **Ubuntu 24.04** → location India (or nearest).
2. Add your SSH public key during setup. **(local)** if you have none: `ssh-keygen -t ed25519 -C "nodal-admin"`.
3. Note the server IP. Log in: `ssh root@SERVER_IP`.

## 2. Base hardening

```bash
apt update && apt -y full-upgrade
apt -y install ufw fail2ban unattended-upgrades iptables-persistent git curl age awscli
dpkg-reconfigure -plow unattended-upgrades        # choose "Yes"

# Non-root deploy user with your key
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

Open a **second** terminal and confirm `ssh deploy@SERVER_IP` works. Then:

```bash
cp /opt/nodal/security/firewall/sshd-hardening.conf /etc/ssh/sshd_config.d/99-nodal.conf   # after step 4 clones the repo
systemctl reload ssh
cp /opt/nodal/security/firewall/fail2ban-jail.local /etc/fail2ban/jail.local && systemctl restart fail2ban
```

## 3. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
```

Log out and back in as `deploy`.

## 4. Get the code

```bash
sudo mkdir -p /opt/nodal && sudo chown deploy:deploy /opt/nodal
git clone https://github.com/<you>/nodal-wealth-club.git /opt/nodal
cd /opt/nodal
cp .env.example .env && chmod 600 .env
nano .env     # fill SITE_URL, SITE_DOMAIN, RATE_LIMIT_SALT, REDIS_PASSWORD, POSTGRES_* (use: openssl rand -hex 32)
```

For a private repo, add a read-only **deploy key** (GitHub → repo → Settings → Deploy keys).

## 5. Cloudflare

1. Add the domain to Cloudflare; change nameservers at your registrar (Hostinger domains: hPanel → Domains → DNS / Nameservers).
2. DNS: `A @ → SERVER_IP` and `CNAME www → @`, both **Proxied** (orange cloud).
3. SSL/TLS → **Full (strict)**. SSL/TLS → Origin Server → **Create certificate** (RSA, 15 years, `domain` + `*.domain`).
4. Save on the server:
   ```bash
   nano security/caddy/certs/origin.pem   # paste certificate
   nano security/caddy/certs/origin.key   # paste private key
   chmod 600 security/caddy/certs/origin.key
   ```
5. Apply WAF, rate-limit and cache rules from `security/cloudflare/rules.md`.

## 6. Firewall (after Cloudflare is proxying)

```bash
sudo ADMIN_IP=<your public IP> bash security/firewall/ufw.sh
```

SSH is now only reachable from `ADMIN_IP`. If your home IP changes, use the Hostinger browser terminal (hPanel → VPS → Terminal) to update the rule.

## 7. Start

```bash
docker compose build
docker compose up -d
docker compose ps        # all services "healthy"
```

Visit `https://your-domain`. Check headers at securityheaders.com (expect A+).

## 8. Backups

1. Create an R2 (or B2) bucket and an access key limited to that bucket; `aws configure` as `deploy`.
2. **(local)** `age-keygen -o nodal-backup.key` → keep this file in your password manager **and** offline. Put only the public key (`age1…`) in `.env` as `BACKUP_AGE_RECIPIENT`, plus `BACKUP_S3_ENDPOINT` and `BACKUP_S3_BUCKET`.
3. Schedule: `crontab -e` →
   ```
   15 2 * * * cd /opt/nodal && ./security/backups/backup.sh >> /home/deploy/backup.log 2>&1
   ```
4. Restore test monthly (`security/backups/restore.sh`) and log it.

## 9. GitHub Actions deploy

1. **(local)** `ssh-keygen -t ed25519 -f deploy_actions -N ""`; append `deploy_actions.pub` to `/home/deploy/.ssh/authorized_keys` on the VPS.
2. GitHub → Settings → Secrets and variables → Actions: `VPS_HOST`, `VPS_USER=deploy`, `VPS_SSH_KEY` (contents of `deploy_actions`), `VPS_KNOWN_HOSTS` (`ssh-keyscan -t ed25519 SERVER_IP`).
3. Because SSH only accepts `ADMIN_IP`, either allow GitHub's runner ranges, use a self-hosted runner on the VPS, or trigger deploys manually from your machine with `ssh deploy@SERVER_IP 'cd /opt/nodal && git pull && docker compose up -d --build'`. The self-hosted runner is the simplest secure option.
4. Every push to `main` that passes CI then runs `.github/workflows/deploy.yml`.

## 10. Before real launch

Work through `security/checklists/pre-launch.md`.

## Day-to-day

| Task             | Command                                                  |
| ---------------- | -------------------------------------------------------- |
| Logs             | `docker compose logs -f web`                             |
| Restart app      | `docker compose restart web`                             |
| Update OS images | `docker compose build --pull && docker compose up -d`    |
| DB shell         | `docker compose exec postgres psql -U nodal_owner nodal` |
