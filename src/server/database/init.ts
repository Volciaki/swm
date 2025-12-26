import "reflect-metadata";

import { DataSource } from "typeorm";
import { entities } from "./entities";
import { migrations } from "./migrations";

export const appDataSource = new DataSource({
    type: "postgres",
    // TODO: get this all via the `environment` interface.
    host: "",
    port: 0,
    username: "",
    password: "",
    database: "",
    // TODO: using `environment` interface, enable this only in development
    synchronize: true,
    // TODO: using `environment` interface, enable this only in development
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
