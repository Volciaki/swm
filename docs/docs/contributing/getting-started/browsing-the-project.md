---
sidebar_position: 2
---

# Browsing the project

After finishing the previous step, those ports will become available:

- [localhost:3000](http://localhost:3000) - App,
- _localhost:5432_ - Database ([PostgreSQL](https://github.com/postgres/postgres)),
- [localhost:3001](http://localhost:3001) - Database UI ([Adminer](https://github.com/vrana/adminer)),
- _localhost:25_ - Mail Server ([MailHog](https://github.com/mailhog/MailHog)),
- [localhost:3002](http://localhost:3002) - Mail Server UI ([MailHog](https://github.com/mailhog/MailHog)),
- _localhost:9000_ - Storage Service ([MinIO](https://github.com/minio/minio)),
- [localhost:3003](http://localhost:3003) - Storage Service UI ([MinIO Console](https://github.com/minio/object-browser))

While not every single one of them is a HTTP server, you should take a look at the ones which do serve web content. Understanding what they're useful for is cruicial for wokring on the project.
