#!/bin/sh

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <migration-name>"
  exit 1
fi

tsc -p tsconfig.migrations.json
tsc-alias -p tsconfig.migrations.json 
NODE_ENV=development typeorm migration:generate -d dist/migrations/database/init.js src/server/database/migrations/$1
