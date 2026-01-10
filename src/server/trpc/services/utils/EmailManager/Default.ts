import { DefaultEmailManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultEmailManager = (ctx: GetServicesContext): DefaultEmailManager => {
	return new DefaultEmailManager();
}
