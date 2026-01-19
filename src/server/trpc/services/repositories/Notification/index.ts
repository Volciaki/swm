import { GetServicesContext } from "../../context";
import { getDBNotificationRepository } from "./DB";

export const getNotificationRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBNotificationRepository(ctx)
	};
};
