import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultUpcomingExpiryMonitoring } from "./Default";

export const getUpcomingExpiryMonitoringPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultUpcomingExpiryMonitoring(ctx),
	};
};
