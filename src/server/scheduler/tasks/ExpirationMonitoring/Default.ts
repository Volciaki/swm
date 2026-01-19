import { SetAssortmentExpiredNotification } from "@/server/modules/assortment/application/use-cases/SetAssortmentExpiredNotification";
import { ExpirationMonitoringTask } from "@/server/modules/monitoring/infrastructure/schedule/ExpirationMonitoringTask";
import { CreateNotification } from "@/server/modules/monitoring/application/use-cases/CreateNotification";
import { GetExpiredAssortment } from "@/server/modules/assortment/application/use-cases/GetExpired";
import { GetServicesContext } from "@/server/trpc/services/context";
import { getPresets, getServices } from "@/server/trpc/services";

export const getDefaultExpirationMonitoring = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const uuidManager = services.utils.uuidManager.default;
	const notificationRepository = services.repositories.notification.db;
	const assortmentRepository = services.repositories.assortment.db;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);
	const assortmentHelper = presets.assortmentHelper.default;

	const createNotification = new CreateNotification(uuidManager, notificationRepository);
	const getExpiredAssortment = new GetExpiredAssortment(assortmentRepository, assortmentFileHelper);
	const setAssortmentExpiredNotification = new SetAssortmentExpiredNotification(
		assortmentHelper,
		assortmentFileHelper,
		assortmentRepository
	);

	return new ExpirationMonitoringTask(createNotification, getExpiredAssortment, setAssortmentExpiredNotification);
};
