FROM node:22-alpine3.22 AS base


FROM base AS deps

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

## Below dependencies are required to execute the scheduler and run migrations.
# We have to list them again here, as Next's build will place its node_modules
# inside of `.next/standalone/node_modules`, and it won't necessarily contain
# all of our dependencies, as it will optimize them to include only the ones
# actually used in the app's source code. This for example results in `node-cron`
# missing, as it's only used in the scheduler, which is technically an unrelated script.
RUN corepack enable \
	&& echo '{\
		"dependencies": {\
			"node-cron": "^4.2.1",\
			"reflect-metadata": "^0.2.2",\
			"typeorm": "^0.3.28",\
			"chalk": "^5.6.2",\
			"date-fns": "^4.1.0"\
		}\
	}' > package.json \
	&& yarn install --production


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION true
ENV NODE_ENV production

RUN corepack enable && yarn build

RUN yarn global add typescript@^5 tsc-alias@^1.8.16
RUN tsc -p tsconfig.migrations.json \
	&& tsc-alias -p tsconfig.migrations.json 


FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache postgresql-client

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/dist ./
COPY --from=scheduler-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/scripts/schedule/trigger-tasks.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/scripts/entrypoint.sh ./

USER nextjs

RUN yarn global add concurrently@^9.2.1 tsx@^4.21.0 typeorm@^0.3.28
ENV PATH="/home/nextjs/.yarn/bin:${PATH}"

EXPOSE 3000
ENV PORT 3000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
