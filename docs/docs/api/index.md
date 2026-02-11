---
sidebar_position: 1
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Introduction

Here you will find signatures of every API route, along with descriptions where deemed necessary.

You can use them like this:

```shell
$ curl --request POST \
    --url http://localhost:3000/api/trpc/identity.login \
    --header 'content-type: application/json' \
    --data '{ "email": "...", "passwordRaw": "..." }'
```

If you want to you can also use Hoppscotch to make your life easier. Find out how to do that <a href={useBaseUrl("/contributing/getting-started/hoppscotch")}>here</a>.
