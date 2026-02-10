---
sidebar_position: 1
---

# ESLint

This project has some quite strict rules enforced via ESLint. The most notable ones include:

- Usage of **tabs** over spaces,
- Maximum line width is **120 characters** (this doesn't apply to strings),
- Imports need to be ordered from the furthest away to the current file, to the closest.

You'll probably see quite a lot of ESLint errors while writing code, so it's useful to know that there's an automatic way to resolve them. To do that simply run:

```shell
$ yarn lint --fix
```

This will automatically take care of the formatting for you, and allow you to jump back into the work.
