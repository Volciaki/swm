import { SetAssortmentCloseToExpirationNotification } from "@/server/modules/assortment/application/use-cases/SetAssortmentCloseToExpirationNotification";
import { GetCloseToExpirationAssortment } from "@/server/modules/assortment/application/use-cases/GetCloseToExpirationAssortment";
import { SchedulerTask } from "@/server/scheduler/task";
import { formatDateAsHumanReadable } from "@/server/utils";
import { CreateNotification } from "../../application/use-cases/CreateNotification";
import { NotificationType } from "../../domain/entities/Notification";

export class UpcomingExpiryMonitoringTask implements SchedulerTask {
	constructor(
		private readonly createNotification: CreateNotification,
		private readonly getCloseToExpirationAssortment: GetCloseToExpirationAssortment,
		private readonly setAssortmentCloseToExpirationNotification: SetAssortmentCloseToExpirationNotification,
	) { }

	getName() { return "UpcomingExpiryMonitoringTask" };

	async execute() {
		const assortmentsToExpire = await this.getCloseToExpirationAssortment.execute();

		for (const assortment of assortmentsToExpire) {
			if (assortment.isCloseToExpirationNotification !== null) continue;

			const notification = await this.createNotification.execute({
				type: NotificationType.REMINDER,
				title: "Przypomnienie o zbliżającej się dacie ważności produktu",
				message: `Produkt "${assortment.name}" (przyjęty ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp))}) zbliża się do końca swojego terminu ważności. Jeśli nie zostanie on zdjęty ze stanu w najbliższym czasie, może stać się nie niezdatny do użytku; w takim przypadku system wyślę kolejne powiadomienie.`
			});
			await this.setAssortmentCloseToExpirationNotification.execute(
				{
					id: assortment.id,
					notification,
				}
			);
		}
	}
}
