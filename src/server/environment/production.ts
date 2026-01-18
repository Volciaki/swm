import { type Environment, EnvironmentType } from "./type";

export const productionEnvironment: Environment = {
	type: EnvironmentType.PRODUCTION,
	port: Number(process.env.PORT),
	database: {
		host: process.env.DATABASE_HOST!,
		port: Number(process.env.DATABASE_PORT),
		username: process.env.DATABASE_USERNAME!,
		password: process.env.DATABASE_PASSWORD!,
		name: process.env.DATABASE_NAME!,
	},
	authentication: {
		secret: process.env.AUTHENTICATION_SECRET!,
		cookie: {
			name: process.env.AUTHENTICATION_COOKIE_NAME!,
			expiresIn: process.env.AUTHENTICATION_COOKIE_EXPIRES_IN!,
		},
	},
	mail: {
		host: process.env.MAIL_HOST!,
		port: Number(process.env.MAIL_PORT),
		sslEnabled: Boolean(process.env.MAIL_SSL_ENABLED),
		user: {
			name: process.env.MAIL_USER_NAME!,
			password: process.env.MAIL_USER_PASSWORD!,
		},
	},
	storage: {
		accessKey: process.env.STORAGE_ACCESS_KEY!,
		secretKey: process.env.STORAGE_SECRET_KEY!,
		endpoint: process.env.STORAGE_ENDPOINT!,
		port: Number(process.env.STORAGE_PORT),
		publicUrl: process.env.STORAGE_PUBLIC_URL!,
		sslEnabled: Boolean(process.env.STORAGE_SSL_ENABLED),
	},
}
