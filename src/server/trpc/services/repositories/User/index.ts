import { GetServicesContext } from "../../context";
import { getDBUserRepository } from "./DB";

export const getUserRepositories = (ctx: GetServicesContext) => {
    return {
        db: getDBUserRepository(ctx)
    };
};
