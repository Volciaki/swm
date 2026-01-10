import { DefaultUUIDManager } from "@/server/utils/uuid/infrastructure";
import { GetServicesContext } from "../../context";

export const getDefaultUUIDManager = (ctx: GetServicesContext): DefaultUUIDManager => {
	return new DefaultUUIDManager();
}
