---
sidebar_position: 1
---

# Development environment setup

:::tip

If you're viewing this documentation locally, you can skip this step. It outlines the process of setting up dependencies, which you've already finished considering that you have this page running.

:::

Before working on the project, you should make sure that you have those tools installed:

- [NodeJS](https://github.com/nodejs/node) v22,
- [Yarn](https://github.com/yarnpkg/berry) v4.9.1,
- [Docker](https://github.com/docker/cli) v27.5.1

Please note that those tools are *not* fully backwards compatible. It is heavily recommended that you stick to those major versions.

After installing the tools, you should fetch our project's dependencies. SWM is built with [NextJS](https://github.com/vercel/next.js), and as you may know, NextJS is a metaframework used for building full stack web applications. This means, that you luckily won't have to go through the hassle of managing dependencies from different ecosystems, as you might have to do with for example a Go backend + TS frontend setup.

To install our projects' dependencies run:

```shell
$ yarn install
```

After the command finishes, you should be able to start the projects by simply using this command:

```shell
$ docker compose up --detach && yarn dev
```

If you want to keep Docker in foreground you'll need 2 terminals. Run `docker compose up` in one of them and `yarn dev` in the other.
