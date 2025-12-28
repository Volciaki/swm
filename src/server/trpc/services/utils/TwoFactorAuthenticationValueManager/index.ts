import { GetServicesContext } from "../../context";
import { getNodeTwoFactorAuthenticationValueManager } from "./Node";

export const getTwoFactorAuthenticationValueManagerServices = (ctx: GetServicesContext) => {
    return {
        node: getNodeTwoFactorAuthenticationValueManager(ctx),
    };
}
