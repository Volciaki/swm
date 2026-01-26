#!/bin/sh

set -e
set -x

typeorm migration:run -d migrations/database/init.js

concurrently --prefix 'none' 'node server.js' 'tsx trigger-tasks.ts'
