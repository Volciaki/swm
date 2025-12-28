import { GetServicesContext } from "../../context";
import { getDBTwoFactorAuthenticationSessionRepository } from "./DB";

export const getTwoFactorAuthenticationSessionRepositories = (ctx: GetServicesContext) => {
    return {
        db: getDBTwoFactorAuthenticationSessionRepository(ctx)
    };
};
