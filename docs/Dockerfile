FROM node:22-alpine3.22 AS base


COPY ./docs/package.json yarn.lock .yarnrc.yml .

RUN corepack enable && yarn install --mode=production --immutable

COPY ./hoppscotch.json .

COPY ./docs .

RUN corepack enable && yarn build

EXPOSE 3004

ENV PATH="./node_modules/.bin:${PATH}"
ENV NODE_ENV="production"

CMD ["yarn", "start"]
