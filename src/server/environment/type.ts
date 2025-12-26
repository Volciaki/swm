export enum EnvironmentType {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
}

export type Environment = {
    type: EnvironmentType,
    port: number,
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    authentication: {
        secret: string;
        cookie: {
            expiresIn: string;
            name: string;
        };
    };
};
