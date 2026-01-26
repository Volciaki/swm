import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultExpirationMonitoring } from "./Default";

export const getExpirationMonitoringPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultExpirationMonitoring(ctx),
	};
};
