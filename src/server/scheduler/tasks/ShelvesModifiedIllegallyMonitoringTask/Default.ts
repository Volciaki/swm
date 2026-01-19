import { ShelvesModifiedIllegallyMonitoringTask } from "@/server/modules/monitoring/infrastructure/schedule/ShelvesModifiedIllegallyMonitoringTask";
import { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";
import { CreateNotification } from "@/server/modules/monitoring/application/use-cases/CreateNotification";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { GetServicesContext } from "@/server/trpc/services/context";
import { getPresets, getServices } from "@/server/trpc/services";

export const getDefaultShelvesModifiedIllegallyMonitoring = (ctx: GetServicesContext) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const uuidManager = services.utils.uuidManager.default;
	const notificationRepository = services.repositories.notification.db;
	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;
	const shelfHelper = presets.shelfHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getShelves = new GetAllShelves(shelfRepository);
	const createNotification = new CreateNotification(uuidManager, notificationRepository);
	const refreshShelfLegalWeight = new RefreshShelfLegalWeight(shelfHelper, shelfRepository);

	return new ShelvesModifiedIllegallyMonitoringTask(
		getAllAssortment,
		getShelves,
		createNotification,
		refreshShelfLegalWeight,
	);
};
