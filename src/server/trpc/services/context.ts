import { DataSource } from "typeorm";

// Values required to construct all services.
export type GetServicesContext = {
    db: DataSource;
};
