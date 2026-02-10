FROM node:22-alpine3.22 AS base


FROM base AS deps

WORKDIR /app

COPY package.json .

RUN corepack enable && yarn install --mode=production --immutable


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN corepack enable && yarn build


FROM nginx:alpine AS runner

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
