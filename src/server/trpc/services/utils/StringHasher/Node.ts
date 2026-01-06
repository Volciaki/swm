import { NodeStringHasher } from "@/server/modules/identity/infrastructure/services/NodeStringHasher";
import { GetServicesContext } from "../../context";

export const getNodeStringHasher = (ctx: GetServicesContext): NodeStringHasher => {
    return new NodeStringHasher();
}
