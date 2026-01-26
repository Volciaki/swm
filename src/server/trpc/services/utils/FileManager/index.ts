import type { GetServicesContext } from "../../context";
import { getDefaultFileManager } from "./Default";

export const getFileManagerServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultFileManager(ctx),
	};
};
