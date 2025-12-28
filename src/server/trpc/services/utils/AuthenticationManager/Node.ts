import { NodeAuthenticationManager } from "@/server/modules/identity/infrastructure/services/NodeAuthenticationManager";
import { GetServicesContext } from "../../context";

export const getNodeAuthenticationManager = (ctx: GetServicesContext): NodeAuthenticationManager => {
    return new NodeAuthenticationManager();
}
