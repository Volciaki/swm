import { type Environment, EnvironmentType } from "./type";

export const productionEnvironment: Environment = {
    type: EnvironmentType.PRODUCTION,
    port: Number(process.env.PORT),
}
