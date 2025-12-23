import { EnvironmentType } from "./type";
import { developmentEnvironment } from "./development";
import { productionEnvironment } from "./production";

export const environment =
    process.env.NODE_ENV === EnvironmentType.DEVELOPMENT
        ? developmentEnvironment
        : productionEnvironment;
