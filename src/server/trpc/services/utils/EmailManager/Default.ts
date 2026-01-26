import { DefaultEmailManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultEmailManager = (ctx: GetServicesContext): DefaultEmailManager => {
	return new DefaultEmailManager();
};
