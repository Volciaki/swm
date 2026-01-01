import { GetServicesContext } from "../context";
import { getUserRepositories } from "./User";
import { getTwoFactorAuthenticationSessionRepositories } from "./TwoFactorAuthenticationSession";
import { getShelfRepositories } from "./Shelf";

export const getRepositories = (ctx: GetServicesContext) => {
    return {
        user: getUserRepositories(ctx),
        twoFactorAuthenticationSession: getTwoFactorAuthenticationSessionRepositories(ctx),
        shelf: getShelfRepositories(ctx),
    };
};
