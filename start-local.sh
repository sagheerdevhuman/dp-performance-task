#!/usr/bin/env bash
set -euo pipefail

# Start backend and frontend from the original repo (no workspaces required).
# - Copies .env.example to .env if missing
# - Installs deps in each app
# - Starts both apps and tails logs

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

log_backend="$ROOT/backend/.local-dev.log"
log_frontend="$ROOT/frontend/.local-dev.log"

echo "[root] Ensuring env files exist..."
if [ ! -f backend/.env ] && [ -f backend/.env.example ]; then
  cp backend/.env.example backend/.env
  echo "  - Created backend/.env from example"
fi
if [ ! -f frontend/.env ] && [ -f frontend/.env.example ]; then
  cp frontend/.env.example frontend/.env
  echo "  - Created frontend/.env from example"
fi

echo "[root] Installing backend deps..."
pushd backend >/dev/null
npm install
popd >/dev/null

echo "[root] Installing frontend deps..."
pushd frontend >/dev/null
npm install
popd >/dev/null

echo "[root] Preparing local database (sqlite)..."
pushd backend >/dev/null
# Read DB settings from backend/.env if present
DB_DIALECT=$(grep -E '^DB_DIALECT=' .env 2>/dev/null | head -n1 | cut -d= -f2 | tr -d '\r' || true)
DB_DIALECT=${DB_DIALECT:-sqlite}
SQLITE_STORAGE=$(grep -E '^SQLITE_STORAGE=' .env 2>/dev/null | head -n1 | cut -d= -f2 | tr -d '\r' || true)
SQLITE_STORAGE=${SQLITE_STORAGE:-./dev.sqlite}

# Normalize DB file path for sqlite
if [ "${SQLITE_STORAGE:0:1}" = "/" ]; then
  DB_FILE="$SQLITE_STORAGE"
else
  DB_FILE="$(pwd)/${SQLITE_STORAGE#./}"
fi

# Allow forcing a clean reset with RESET_DEV_DB=always
RESET_MODE=${RESET_DEV_DB:-auto}
# RESET_DEV_DB=always

if [ "${DB_DIALECT,,}" = "sqlite" ]; then
  if [ "$RESET_MODE" = "always" ]; then
    echo "  - RESET_DEV_DB=always -> resetting"
    rm -f "$DB_FILE"
    npx sequelize db:migrate
    echo "  - App will bootstrap demo data on first start"
  elif [ ! -f "$DB_FILE" ] || [ ! -s "$DB_FILE" ]; then
    echo "  - No sqlite DB found -> migrating"
    npx sequelize db:migrate
    echo "  - App will bootstrap demo data on first start"
  else
    echo "  - SQLite DB exists at $DB_FILE (skipping reset)"
  fi
else
  echo "  - Non-sqlite dialect ($DB_DIALECT); skipping local auto-migrate"
fi
popd >/dev/null

echo "[root] Starting backend... (logs: $log_backend)"
pushd backend >/dev/null
nohup npm start > "$log_backend" 2>&1 &
BACK_PID=$!
popd >/dev/null

trap 'echo; echo "Stopping..."; kill $BACK_PID $FRONT_PID 2>/dev/null || true; exit 0' INT TERM

echo "[root] Waiting for backend health at http://localhost:5001/health ..."
for i in $(seq 1 30); do
  if curl -fsS http://localhost:5001/health >/dev/null 2>&1; then
    echo "  - Backend healthy"
    break
  fi
  sleep 1
  if [ $i -eq 30 ]; then
    echo "Backend did not become healthy in time. Check $log_backend" >&2
  fi
done

echo "[root] Starting frontend... (logs: $log_frontend)"
pushd frontend >/dev/null
nohup npm run dev -- --port 5173 > "$log_frontend" 2>&1 &
FRONT_PID=$!
popd >/dev/null

echo "\nRunning:"
echo "  - Backend:  http://localhost:5001   (health: /health)"
echo "  - Frontend: http://localhost:5173"
echo "\nPress Ctrl+C to stop. Tailing logs...\n"

tail -n 50 -f "$log_backend" "$log_frontend" &
TAIL_PID=$!
wait $TAIL_PID
