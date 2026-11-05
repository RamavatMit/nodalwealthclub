# Container hardening

Applied in `docker-compose.yml` and `Dockerfile`:

| Control | Where |
| --- | --- |
| App runs as non-root user `nextjs` (uid 1001) | `Dockerfile` |
| Read-only root filesystem; only `/tmp` and `.next/cache` writable (tmpfs) | `web`, `redis` |
| `no-new-privileges`, all Linux capabilities dropped | `web` |
| Postgres and Redis on an `internal: true` network, no published ports | `networks` |
| Only Caddy publishes 80/443 | `caddy` |
| Redis password required; `FLUSHALL` and `CONFIG` disabled | `redis` |
| App connects as least-privilege `nodal_app` DB role | `postgres-init.sh` |
| Memory limit on the app container | `web.mem_limit` |
| Health checks on every service | compose |

Review: quarterly, and whenever a service is added (e.g. the Phase 2 `worker`).
