import { GetServicesContext } from "../../context";
import { getNodeStringHasher } from "./Node";

export const getStringHasherServices = (ctx: GetServicesContext) => {
	return {
		node: getNodeStringHasher(ctx)
	};
}
