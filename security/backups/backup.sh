#!/usr/bin/env bash
# Nightly encrypted Postgres backup to Cloudflare R2 / Backblaze B2 (S3 API).
# Cron (as the deploy user):
#   15 2 * * * cd /opt/nodal && ./security/backups/backup.sh >> /var/log/nodal-backup.log 2>&1
#
# Requires on the host: docker, age (https://age-encryption.org), aws CLI v2
# configured with an access key scoped to the backup bucket only.
# Encryption uses an age PUBLIC key; the private key is kept OFF the server
# (password manager + offline copy), so a compromised VPS cannot read backups.
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; . ./.env; set +a

: "${BACKUP_S3_ENDPOINT:?}" "${BACKUP_S3_BUCKET:?}" "${BACKUP_AGE_RECIPIENT:?}"

STAMP=$(date -u +%Y-%m-%dT%H%M%SZ)
FILE="nodal-${STAMP}.sql.gz.age"
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

docker compose exec -T postgres pg_dump -U nodal_owner -d nodal --no-owner --format=plain \
  | gzip -9 \
  | age -r "$BACKUP_AGE_RECIPIENT" > "$TMP"

aws s3 cp "$TMP" "s3://${BACKUP_S3_BUCKET}/postgres/${FILE}" --endpoint-url "$BACKUP_S3_ENDPOINT" --only-show-errors

# Retention: delete objects older than 30 days (a bucket lifecycle rule is the
# preferred backstop; this keeps the policy explicit).
CUTOFF=$(date -u -d '30 days ago' +%Y-%m-%d)
aws s3 ls "s3://${BACKUP_S3_BUCKET}/postgres/" --endpoint-url "$BACKUP_S3_ENDPOINT" \
  | awk -v cutoff="$CUTOFF" '$1 < cutoff {print $4}' \
  | while read -r old; do
      aws s3 rm "s3://${BACKUP_S3_BUCKET}/postgres/${old}" --endpoint-url "$BACKUP_S3_ENDPOINT" --only-show-errors
    done

echo "$(date -u +%FT%TZ) backup ok: ${FILE}"
