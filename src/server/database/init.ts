import "reflect-metadata";

import { DataSource } from "typeorm";
import { EnvironmentType } from "../environment/type";
import { environment } from "../environment";
import { entities } from "./entities";
import { migrations } from "./migrations";

export const appDataSource = new DataSource({
    type: "postgres",
    host: environment.database.host,
    port: environment.database.port,
    username: environment.database.username,
    password: environment.database.password,
    database: environment.database.name,
    synchronize: environment.type === EnvironmentType.DEVELOPMENT,
    logging: true,
    migrations,
    entities,
});

export const initializeDatabase = async () => {
    if (appDataSource.isInitialized) return;

    await appDataSource.initialize();
    // TODO: write a logger interface
    console.log("Database connection initialized!");
};
