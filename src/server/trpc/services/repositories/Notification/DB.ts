import { DBNotificationRepository } from "@/server/modules/monitoring/infrastructure/persistence/DBNotificationRepository";
import { DBNotification } from "@/server/modules/monitoring/infrastructure/entities/DBNotification";
import type { GetServicesContext } from "../../context";

export const getDBNotificationRepository = (ctx: GetServicesContext): DBNotificationRepository => {
	return new DBNotificationRepository(ctx.db.getRepository(DBNotification));
};
