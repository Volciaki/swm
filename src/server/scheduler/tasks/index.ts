import type { GetServicesContext } from "@/server/trpc/services/context";

import { getExpirationMonitoringPresets } from "./ExpirationMonitoring";
import { getUpcomingExpiryMonitoringPresets } from "./UpcomingExpiryMonitoringTask";
import { getShelvesModifiedIllegallyMonitoringPresets } from "./ShelvesModifiedIllegallyMonitoringTask";
import { getUpdateShelfTemperaturesPresets } from "./UpdateShelfTemperaturesTask";
import { getRoutinaryBackupCheckPresets } from "./RoutinaryBackupCheckTask";

const getPresets = (ctx: GetServicesContext) => {
	return {
		expirationMonitoring: getExpirationMonitoringPresets(ctx),
		upcomingExpiryMonitoring: getUpcomingExpiryMonitoringPresets(ctx),
		shelvesModifiedIllegallyMonitoringTask: getShelvesModifiedIllegallyMonitoringPresets(ctx),
		updateShelfTemperaturesTask: getUpdateShelfTemperaturesPresets(ctx),
		routinaryBackupCheckTask: getRoutinaryBackupCheckPresets(ctx),
	};
};

export const getSchedulerTasks = (ctx: GetServicesContext) => {
	const presets = getPresets(ctx);

	const epxirationMonitoring = presets.expirationMonitoring.default;
	const upcomingExpiryMonitoring = presets.upcomingExpiryMonitoring.default;
	const shelvesModifiedIllegallyMonitoringTask = presets.shelvesModifiedIllegallyMonitoringTask.default;
	const updateShelfTemperaturesTask = presets.updateShelfTemperaturesTask.default;
	const routinaryBackupCheckTask = presets.routinaryBackupCheckTask.default;

	return [
		epxirationMonitoring,
		upcomingExpiryMonitoring,
		shelvesModifiedIllegallyMonitoringTask,
		updateShelfTemperaturesTask,
		routinaryBackupCheckTask,
	];
};
