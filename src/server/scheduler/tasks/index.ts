import { appDataSource } from "@/server/database/init";
import { GetServicesContext } from "@/server/trpc/services/context";
import { getExpirationMonitoringPresets } from "./ExpirationMonitoring";
import { getUpcomingExpiryMonitoringPresets } from "./UpcomingExpiryMonitoringTask";

const getPresets = (ctx: GetServicesContext) => {
	return {
		expirationMonitoring: getExpirationMonitoringPresets(ctx),
		upcomingExpiryMonitoring: getUpcomingExpiryMonitoringPresets(ctx),
	};
};

export const getSchedulerTasks = () => {
	const servicesContext: GetServicesContext = { db: appDataSource };
	const presets = getPresets(servicesContext);

	const epxirationMonitoring = presets.expirationMonitoring.default;
	const upcomingExpiryMonitoring = presets.upcomingExpiryMonitoring.default;
	
	return [epxirationMonitoring, upcomingExpiryMonitoring];
};
