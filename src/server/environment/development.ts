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
}
