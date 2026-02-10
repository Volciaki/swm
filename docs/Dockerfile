FROM node:22-alpine3.22 AS base


COPY package.json .

RUN corepack enable && yarn install --mode=production --immutable

COPY . .

RUN corepack enable && yarn build

EXPOSE 3004

ENV PATH="./node_modules/.bin:${PATH}"

CMD ["yarn", "start"]
