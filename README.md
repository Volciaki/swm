<h1 align="center">Primus Inter Pares 2026 - Volciaki</h1>

## Development Environment

> [!WARNING]  
> This project was built solely on Linux. Nobody in the team uses Windows, and we couldn't do much to ensure compatibility with non-Unix systems. Please be aware that you might face some issues while trying to get it up and running on other systems.

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
- _localhost:9000_ - Storage Service ([MinIO](https://github.com/minio/minio)),
- [localhost:3003](http://localhost:3003) - Storage Service UI ([MinIO Console](https://github.com/minio/object-browser)),
- [localhost:3004](http://localhost:3004) - Documentation ([Docusaurus](https://github.com/facebook/docusaurus)),

For more insights please visit the documentation, either running [locally](http://localhost:3004) after finishing above setup, or a [publicly hosted instance](https://volciaki.palubiak.eu/docs).
