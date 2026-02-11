---
sidebar_position: 1
---

# Docker

The primary way of hosting our app is using Docker. This is the deployment method we use, and it will probably keep being the most supported one.

This is the Docker Compose file we're using in production:

```docker
services:
  postgres:
    image: postgres:17
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: <database-user>
      POSTGRES_PASSWORD: <database-password>
      POSTGRES_DB: db
    volumes:
      - postgres-storage:/var/lib/postgresql/data

  adminer:
    image: michalhosna/adminer:4.8.1-en_v1
    restart: always
    ports:
      - "3001:8080"
    environment:
      ADMINER_DRIVER: pgsql
      ADMINER_SERVER: postgres
      ADMINER_DB: db
    links: 
      - postgres:postgres
    depends_on:
      - postgres

  minio:
    image: minio/minio:RELEASE.2024-11-07T00-52-20Z.fips
    restart: always
    command: server /data --console-address ":9001"
    ports:
      - "3002:9000"
      - "3003:9001"
    environment:
      MINIO_ROOT_USER: <file-storage-user>
      MINIO_ROOT_PASSWORD: <file-storage-password>
      MINIO_BROWSER_REDIRECT_URL: <file-storage-ui-url> # e.g.: https://volciaki.palubiak.eu/files-ui
      MINIO_SERVER_URL: <file-storage-server-endpoint> # e.g.: http://volciaki.palubiak.eu:3002
    volumes:
      - minio-storage:/data

  app:
    image: ghcr.io/volciaki/primus-inter-pares-2026:latest
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - minio
    links:
      - postgres:postgres
      - minio:minio
    environment:
      NODE_ENV: production
      API_URL: http://app:3000
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USERNAME: <database-user>
      DATABASE_PASSWORD: <database-password>
      DATABASE_NAME: db
      AUTHENTICATION_SECRET: <secure-key-1>
      AUTHENTICATION_COOKIE_NAME: volciaki-authentication-cookie
      AUTHENTICATION_COOKIE_EXPIRES_IN: 12h
      MAIL_HOST: <mail-server> # e.g.: smtp.gmail.com
      MAIL_PORT: 465
      MAIL_SSL_ENABLED: 1
      MAIL_USER_NAME: <mail-user>
      MAIL_USER_PASSWORD: <mail-password>
      STORAGE_ACCESS_KEY: <file-storage-user>
      STORAGE_SECRET_KEY: <file-storage-password>
      STORAGE_ENDPOINT: minio
      STORAGE_PORT: 9000
      STORAGE_PUBLIC_URL: <file-storage-server-url> # e.g.: https://volciaki.palubiak.eu/files
      STORAGE_SSL_ENABLED: # e.g.: 1 - leave empty if communicating locally.
      SCHEDULE_AUTHENTICATION_PASSPHRASE: <secure-key-2>
      ENCRYPTION_KEY: <secure-key-3>

volumes:
  postgres-storage: ~
  minio-storage: ~
```

Then afterwards, we're using nginx as our reverse proxy to map different URL paths to certain services, here's how that looks like:

```nginx
# Certbot is used to provide SSL certificates.

server {
    server_name volciaki.palubiak.eu;

    client_max_body_size 50M;

    location / {
		proxy_pass http://localhost:3000;

        <shared_options>
    }    

    location /database-ui {
        proxy_pass http://localhost:3001;

        <shared_options>

    	rewrite ^/database-ui(/.*)$ $1 break;
    }

    location /files {
        proxy_pass http://localhost:3002;

        <shared_options>

    	rewrite ^/files(/.*)$ $1 break;
    }

    location /files-ui {
        proxy_pass http://localhost:3003;

        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-NginX-Proxy true;
        real_ip_header X-Real-IP;
        proxy_connect_timeout 300;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        chunked_transfer_encoding off;

        rewrite ^/files-ui/(.*) /$1 break;
    }
}
```

where `<shared_options>` are for example:

```
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
```

They do not apply to MinIO console, as it requires speciffic configuration if running behind a proxy.
