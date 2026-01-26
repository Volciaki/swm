import type { GetServicesContext } from "../../context";
import { getDefaultEncryptionManager } from "./Default";

export const getEncryptionManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultEncryptionManager(ctx),
	};
};
