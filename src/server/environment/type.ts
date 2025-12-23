export enum EnvironmentType {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
}

export type Environment = {
    type: EnvironmentType,
    port: number,
};
