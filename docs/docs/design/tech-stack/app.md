---
sidebar_position: 1
---

# App

The app itself depends on a couple of web technologies. Most notably, we're using:

- [NextJS](https://github.com/vercel/next.js),
- [tRPC](https://github.com/trpc/trpc),
- [Docusaurus](https://github.com/facebook/docusaurus)

Each of these tools has been chosen for reasons tailored to our project. We have considered creating a monorepo, with API and frontend decoupled instead of running as a full stack app, but due to anticipation of a quickly paced environment we've decided to stick to a single app. This fast paced expectation has also influenced our choice of using tRPC. Thanks to the typesafety which it provides we don't have to fear accidentally breaking anything, and we can work confidently as every piece of code feels tightly integrated.

We're also using Docusaurus for writing our documentation. In this case creating a website from scratch would be way of an overkill.
