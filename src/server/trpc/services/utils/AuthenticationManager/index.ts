import { GetServicesContext } from "../../context";
import { getNodeAuthenticationManager } from "./Node";

export const getAuthenticationManagerServices = (ctx: GetServicesContext) => {
    return {
        node: getNodeAuthenticationManager(ctx),
    };
}
