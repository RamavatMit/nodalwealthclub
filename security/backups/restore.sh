#!/usr/bin/env bash
# Restore a backup into a SCRATCH database to verify it (monthly restore test),
# or into production during an incident.
#
#   ./security/backups/restore.sh nodal-2026-10-09T021500Z.sql.gz.age /path/to/age-key.txt [target_db]
#
# target_db defaults to "nodal_restore_test" so a test never touches live data.
# Restoring into "nodal" requires typing the database name to confirm.
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; . ./.env; set +a

OBJECT="${1:?backup object name}"
KEY="${2:?path to age identity (private key) file}"
TARGET="${3:-nodal_restore_test}"

if [ "$TARGET" = "nodal" ]; then
  read -r -p "This overwrites PRODUCTION. Type 'nodal' to continue: " confirm
  [ "$confirm" = "nodal" ] || { echo "aborted"; exit 1; }
fi

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT
aws s3 cp "s3://${BACKUP_S3_BUCKET}/postgres/${OBJECT}" "$TMP" --endpoint-url "$BACKUP_S3_ENDPOINT" --only-show-errors

docker compose exec -T postgres psql -U nodal_owner -d postgres -c "DROP DATABASE IF EXISTS ${TARGET};" -c "CREATE DATABASE ${TARGET};"
age -d -i "$KEY" "$TMP" | gunzip | docker compose exec -T postgres psql -U nodal_owner -d "$TARGET" -v ON_ERROR_STOP=1 -q

docker compose exec -T postgres psql -U nodal_owner -d "$TARGET" -c "\dt" | head -20
echo "Restored ${OBJECT} into ${TARGET}. Record the result in security/backups/restore-test-log.md."
