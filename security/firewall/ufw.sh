#!/usr/bin/env bash
# Host firewall for the VPS. Run once as root after SSH keys are working:
#   sudo ADMIN_IP=203.0.113.10 bash security/firewall/ufw.sh
#
# - SSH only from your admin IP (keys only; see sshd_config.d below)
# - HTTP/HTTPS only from Cloudflare, so the origin can't be hit directly
#
# NOTE: Docker publishes ports through iptables and bypasses plain UFW rules.
# The DOCKER-USER rules at the end make the Cloudflare restriction apply to
# containers as well.
set -euo pipefail

: "${ADMIN_IP:?Set ADMIN_IP to the IP you will SSH from}"

ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow from "$ADMIN_IP" to any port 22 proto tcp comment 'SSH admin'

CF_V4=$(curl -fsS https://www.cloudflare.com/ips-v4)
CF_V6=$(curl -fsS https://www.cloudflare.com/ips-v6)
for ip in $CF_V4 $CF_V6; do
  ufw allow from "$ip" to any port 80,443 proto tcp comment 'Cloudflare'
done

ufw --force enable

# Apply the same allow-list to Docker-published ports.
iptables -F DOCKER-USER || true
for ip in $CF_V4; do
  iptables -A DOCKER-USER -p tcp -m multiport --dports 80,443 -s "$ip" -j RETURN
done
iptables -A DOCKER-USER -p tcp -m multiport --dports 80,443 -j DROP
iptables -A DOCKER-USER -j RETURN
netfilter-persistent save 2>/dev/null || echo "Install iptables-persistent to keep DOCKER-USER rules after reboot."

ufw status verbose
