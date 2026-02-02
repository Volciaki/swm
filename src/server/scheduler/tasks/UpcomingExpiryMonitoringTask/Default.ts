import { SetAssortmentCloseToExpirationNotification } from "@/server/modules/assortment/application/use-cases/SetAssortmentCloseToExpirationNotification";
import { GetCloseToExpirationAssortment } from "@/server/modules/assortment/application/use-cases/GetCloseToExpirationAssortment";
import { UpcomingExpiryMonitoringTask } from "@/server/modules/monitoring/infrastructure/schedule/UpcomingExpiryMonitoringTask";
import { CreateNotification } from "@/server/modules/monitoring/application/use-cases/CreateNotification";
import type { GetServicesContext } from "@/server/trpc/services/context";
import { getPresets, getServices } from "@/server/trpc/services";

export const getDefaultUpcomingExpiryMonitoring = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const uuidManager = services.utils.uuidManager.default;
	const notificationRepository = services.repositories.notification.db;
	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const assortmentHelper = presets.assortmentHelper.default;
	const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const createNotification = new CreateNotification(uuidManager, notificationRepository);
	const getCloseToExpirationAssortment = new GetCloseToExpirationAssortment(
		assortmentRepository,
		assortmentDefinitionUtilities
	);
	const setAssortmentExpiredNotification = new SetAssortmentCloseToExpirationNotification(
		assortmentHelper,
		assortmentDefinitionUtilities,
		assortmentRepository
	);

	return new UpcomingExpiryMonitoringTask(
		createNotification,
		getCloseToExpirationAssortment,
		setAssortmentExpiredNotification
	);
};
