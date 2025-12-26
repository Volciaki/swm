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
}
