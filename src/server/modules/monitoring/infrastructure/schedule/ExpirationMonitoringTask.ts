import type { SetAssortmentExpiredNotification } from "@/server/modules/assortment/application/use-cases/SetAssortmentExpiredNotification";
import type { GetExpiredAssortment } from "@/server/modules/assortment/application/use-cases/GetExpired";
import type { SchedulerTask } from "@/server/scheduler/task";
import { formatDateAsHumanReadable } from "@/utils";
import type { CreateNotification } from "../../application/use-cases/CreateNotification";
import { NotificationType } from "../../domain/entities/Notification";

export class ExpirationMonitoringTask implements SchedulerTask {
	constructor(
		private readonly createNotification: CreateNotification,
		private readonly getExpiredAssortment: GetExpiredAssortment,
		private readonly setAssortmentExpiredNotification: SetAssortmentExpiredNotification
	) {}

	getName() {
		return "ExpirationMonitoringTask";
	}

	async execute() {
		const expiredAssortments = await this.getExpiredAssortment.execute();

		for (const assortment of expiredAssortments) {
			if (assortment.hasExpiredNotification !== null) continue;

			const notification = await this.createNotification.execute({
				type: NotificationType.ALERT,
				title: "Produkt przekroczył termin ważności",
				message: `Produkt "${assortment.name}" (przyjęty ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp))}) przekroczył swój termin ważności. Najprawdopodobniej nie będzie już zdatny do użytku.`,
			});
			await this.setAssortmentExpiredNotification.execute({
				id: assortment.id,
				notification,
			});
		}
	}
}
