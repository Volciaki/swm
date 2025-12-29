import { GetServicesContext } from "../../context";
import { getNodeTwoFactorAuthenticationValueGenerator } from "./Node";

export const getTwoFactorAuthenticationValueGeneratorServices = (ctx: GetServicesContext) => {
    return {
        node: getNodeTwoFactorAuthenticationValueGenerator(ctx),
    };
}
