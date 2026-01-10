<h1 align="center">Primus Inter Pares 2026 - Volciaki</h1>

## Development Environment

### Setup

This project was built with:

- [NodeJS](https://github.com/nodejs/node) v22,
- [Yarn](https://github.com/yarnpkg/berry) v4.9.1,
- [Docker](https://github.com/docker/cli) v27.5.1

Older versions of these tools might not work.

To download the dependencies, run:

```shell
$ yarn install
```

### Usage

After finishing the setup, you'll be able to use numerous commands, for example:

- `$ docker compose up --detach && yarn dev` to start the app,
- `$ yarn build` to build it,
- `$ yarn lint` to lint the whole project

Running the first command will cause the following ports to become responsive:

- [localhost:3000](http://localhost:3000) - App,
- _localhost:5432_ - Database ([PostgreSQL](https://github.com/postgres/postgres)),
- [localhost:3001](http://localhost:3001) - Database UI ([Adminer](https://github.com/vrana/adminer)),
- _localhost:25_ - Mail Server ([MailHog](https://github.com/mailhog/MailHog)),
- [localhost:3002](http://localhost:3002) - Mail Server UI ([MailHog](https://github.com/mailhog/MailHog)),

I've also left a [Hoppscotch](https://github.com/hoppscotch/hoppscotch) collection in `hoppscotch.json`. You may find it useful if you wish to play around with the API.

Have fun! :)

#### Database Migrations

To write a migration you should use either `migrations:generate` or `migrations:create` script. `migrations:generate` attempts to automatically generate SQL necessary to turn your current, available database schema into a structure matching defined entities, and `migrations:create` only writes the migration's boilerplate to an appropiate location.
