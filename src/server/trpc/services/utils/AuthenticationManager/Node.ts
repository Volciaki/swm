import { NodeAuthenticationManager } from "@/server/modules/identity/infrastructure/services/NodeAuthenticationManager";
import type { GetServicesContext } from "../../context";

export const getNodeAuthenticationManager = (ctx: GetServicesContext): NodeAuthenticationManager => {
	return new NodeAuthenticationManager();
};
