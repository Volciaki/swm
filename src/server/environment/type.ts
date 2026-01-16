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
    mail: {
        host: string;
        port: number;
        sslEnabled: boolean;
        user: {
            name: string;
            password: string;
        },
    },
	storage: {
		accessKey: string;
		secretKey: string;
		endpoint: string;
		publicUrl: string;
		port: number;
		sslEnabled: boolean;
	},
};
