import { NodeTwoFactorAuthenticationValueManager } from "@/server/modules/identity/infrastructure/services/NodeTwoFactorAuthenticationValueManager";
import { GetServicesContext } from "../../context";

export const getNodeTwoFactorAuthenticationValueManager = (ctx: GetServicesContext): NodeTwoFactorAuthenticationValueManager => {
    return new NodeTwoFactorAuthenticationValueManager();
}
