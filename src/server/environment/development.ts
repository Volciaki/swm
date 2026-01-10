import { type Environment, EnvironmentType } from "./type";

export const developmentEnvironment: Environment = {
	type: EnvironmentType.DEVELOPMENT,
	port: Number(process.env.PORT ?? 3000),
	database: {
		host: process.env.DATABASE_HOST ?? "localhost",
		port: Number(process.env.DATABASE_PORT ?? 5432),
		username: process.env.DATABASE_USERNAME ?? "development-user",
		password: process.env.DATABASE_PASSWORD ?? "development-password",
		name: process.env.DATABASE_NAME ?? "db",
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
}
