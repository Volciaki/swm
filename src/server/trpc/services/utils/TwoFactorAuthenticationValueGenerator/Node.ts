import { NodeTwoFactorAuthenticationValueGenerator } from "@/server/modules/identity/infrastructure/services/NodeTwoFactorAuthenticationValueGenerator";
import type { GetServicesContext } from "../../context";

export const getNodeTwoFactorAuthenticationValueGenerator = (
	ctx: GetServicesContext
): NodeTwoFactorAuthenticationValueGenerator => {
	return new NodeTwoFactorAuthenticationValueGenerator();
};
