import type { GetServicesContext } from "../../context";
import { getAssortmentFIFOQueueManager } from "./Assortment";

export const getFIFOQueueManagerServices = (ctx: GetServicesContext) => {
	return {
		assortment: getAssortmentFIFOQueueManager(ctx),
	};
};
