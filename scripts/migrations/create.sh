#!/bin/sh

if [ -z "$1" ]; then
  echo "Usage: $0 <migration-name>"
  exit 1
fi

typeorm migration:create ./src/server/database/migrations/$1
