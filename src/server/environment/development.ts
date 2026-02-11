import { type Environment, EnvironmentType, NextPhase } from "./type";

export const developmentEnvironment: Environment = {
	type: EnvironmentType.DEVELOPMENT,
	nextPhase: process.env.NEXT_PHASE === "phase-production-build" ? NextPhase.BUILD : null,
	port: Number(process.env.PORT ?? 3000),
	encryption: {
		key: process.env.ENCRYPTION_KEY ?? "development-encryption-key",
	},
	schedule: {
		authentication: {
			passphrase: process.env.SCHEDULE_AUTHENTICATION_PASSPHRASE ?? "development-schedule-authentication-passphrase",
		},
	},
	database: {
		host: process.env.DATABASE_HOST ?? "localhost",
		port: Number(process.env.DATABASE_PORT ?? 5432),
		username: process.env.DATABASE_USERNAME ?? "development-user",
		password: process.env.DATABASE_PASSWORD ?? "development-password",
		name: process.env.DATABASE_NAME ?? "db",
		sslEnabled: Boolean(process.env.DATABASE_SSL_ENABLED ?? false),
	},
	authentication: {
		secret: process.env.AUTHENTICATION_SECRET ?? "development-authentication-secret",
		cookie: {
			name: process.env.AUTHENTICATION_COOKIE_NAME ?? "development-authentication-cookie",
			expiresIn: process.env.AUTHENTICATION_COOKIE_EXPIRES_IN ?? "5h",
		},
	},
	mail: {
		host: process.env.MAIL_HOST ?? "localhost",
		port: Number(process.env.MAIL_PORT ?? 25),
		sslEnabled: Boolean(process.env.MAIL_SSL_ENABLED ?? false),
		user: {
			name: process.env.MAIL_USER_NAME ?? "development-mail-user",
			password: process.env.MAIL_USER_PASSWORD ?? "development-mail-password",
		},
	},
	storage: {
		accessKey: process.env.STORAGE_ACCESS_KEY ?? "development-user",
		secretKey: process.env.STORAGE_SECRET_KEY ?? "development-password",
		endpoint: process.env.STORAGE_ENDPOINT ?? "localhost",
		port: Number(process.env.STORAGE_PORT ?? 9000),
		publicUrl: process.env.STORAGE_PUBLIC_URL ?? "http://localhost:9000",
		sslEnabled: Boolean(process.env.STORAGE_SSL_ENABLED ?? false),
	},
};
