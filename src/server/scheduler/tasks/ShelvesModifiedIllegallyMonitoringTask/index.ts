import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultShelvesModifiedIllegallyMonitoring } from "./Default";

export const getShelvesModifiedIllegallyMonitoringPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultShelvesModifiedIllegallyMonitoring(ctx),
	};
};
