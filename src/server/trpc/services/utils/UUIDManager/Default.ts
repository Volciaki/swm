import { DefaultUUIDManager } from "@/server/utils/uuid/infrastructure";
import type { GetServicesContext } from "../../context";

export const getDefaultUUIDManager = (ctx: GetServicesContext): DefaultUUIDManager => {
	return new DefaultUUIDManager();
};
