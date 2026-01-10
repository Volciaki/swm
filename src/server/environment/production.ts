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
}
