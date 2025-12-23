import { type Environment, EnvironmentType } from "./type";

export const developmentEnvironment: Environment = {
    type: EnvironmentType.DEVELOPMENT,
    port: Number(process.env.PORT ?? 3000),
}
