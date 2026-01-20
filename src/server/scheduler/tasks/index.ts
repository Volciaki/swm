import { appDataSource } from "@/server/database/init";
import { GetServicesContext } from "@/server/trpc/services/context";

import { getExpirationMonitoringPresets } from "./ExpirationMonitoring";
import { getUpcomingExpiryMonitoringPresets } from "./UpcomingExpiryMonitoringTask";
import { getShelvesModifiedIllegallyMonitoringPresets } from "./ShelvesModifiedIllegallyMonitoringTask";
import { getUpdateShelfTemperaturesPresets } from "./UpdateShelfTemperaturesTask";

const getPresets = (ctx: GetServicesContext) => {
	return {
		expirationMonitoring: getExpirationMonitoringPresets(ctx),
		upcomingExpiryMonitoring: getUpcomingExpiryMonitoringPresets(ctx),
		shelvesModifiedIllegallyMonitoringTask: getShelvesModifiedIllegallyMonitoringPresets(ctx),
		updateShelfTemperaturesTask: getUpdateShelfTemperaturesPresets(ctx),
	};
};

export const getSchedulerTasks = () => {
	const servicesContext: GetServicesContext = { db: appDataSource };
	const presets = getPresets(servicesContext);

	const epxirationMonitoring = presets.expirationMonitoring.default;
	const upcomingExpiryMonitoring = presets.upcomingExpiryMonitoring.default;
	const shelvesModifiedIllegallyMonitoringTask = presets.shelvesModifiedIllegallyMonitoringTask.default;
	const updateShelfTemperaturesTask = presets.updateShelfTemperaturesTask.default;
	
	return [
		epxirationMonitoring,
		upcomingExpiryMonitoring,
		shelvesModifiedIllegallyMonitoringTask,
		updateShelfTemperaturesTask,
	];
};
