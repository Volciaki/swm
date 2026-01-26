import { GetNotifications } from "@/server/modules/monitoring/application/use-cases/GetNotifications";
import type { NotificationDTO } from "@/server/modules/monitoring/application/dto/shared/NotificationDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

// TODO: convert this to a subscription later, read some tRPC docs.
export const getAll = procedure.query<NotificationDTO[]>(async ({ ctx }) => {
	const services = getServices(ctx);

	const notificationRepository = services.repositories.notification.db;

	const action = new GetNotifications(notificationRepository);
	return await action.execute(ctx.user ?? undefined);
});
