FROM node:22-alpine3.22 AS base


FROM base AS deps

# TODO: install `pg_dump` and `pg_restore` here...

# Checkout:
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml .

RUN corepack enable && yarn install --mode=production --immutable


FROM base AS scheduler-deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

# This is required when hosting the app in NodeJS envrionemnts.
# It isn't needed on the edge, so it's not listed in package.json's `dependencies`.
RUN corepack enable \
	&& echo '{"dependencies":{"node-cron":"^4.2.1"}}' > package.json \
	&& yarn install --production


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION true
ENV NODE_ENV production

RUN corepack enable && yarn build


FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/scripts/schedule ./
COPY --from=scheduler-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

RUN yarn global add concurrently tsx
ENV PATH="/home/nextjs/.yarn/bin:${PATH}"

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" concurrently --prefix 'none' 'node server.js' 'tsx trigger-tasks.ts'
