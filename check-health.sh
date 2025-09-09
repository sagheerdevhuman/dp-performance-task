#!/usr/bin/env bash
set -euo pipefail

URL="${1:-http://localhost:5001/health}"

echo "Pinging: $URL"
for i in $(seq 1 30); do
  if curl -fsS "$URL" >/dev/null; then
    echo "Healthy: $URL"
    exit 0
  fi
  sleep 1
done
echo "Timed out waiting for: $URL" >&2
exit 1

