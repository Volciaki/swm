import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { AssortmentFIFOQueueManager } from "@/server/modules/storage/infrastructure/services/AssortmentFIFOQueueManager";
import type { GetServicesContext } from "../../context";

export const getAssortmentFIFOQueueManager = (ctx: GetServicesContext) => {
	return {
		get: (getAllAssortment: GetAllAssortment) => new AssortmentFIFOQueueManager(getAllAssortment),
	};
};
