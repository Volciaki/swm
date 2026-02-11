---
sidebar_position: 2
---

# Services

Our app, same as most, also depends on some third party services. This includes our database and file storage, which are:

- Database - [Postgres](https://github.com/postgres/postgres),
- File storage - [MinIO](https://github.com/minio/minio) [1]

We've decided to use Postgres, as it's a well established industry standard, and we've had some prior experience with it. MinIO on the other hand was simply easy to self host and compatible with more mainstream alternatives.

Besides above services, we're also using those:

- Database UI - ([Adminer](https://github.com/vrana/adminer)),
- Mail server mock (used in developmen) - ([MailHog](https://github.com/mailhog/MailHog))

They're just useful to have around.

[1] Note: MinIO is S3 compatible, so technically our app can use any S3-like services for file storage. This includes most common options, such as Amazon S3 itself, DigitalOcean Spaces, and more.
