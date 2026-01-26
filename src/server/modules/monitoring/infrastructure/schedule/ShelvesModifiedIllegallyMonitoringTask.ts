import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { SchedulerTask } from "@/server/scheduler/task";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { RefreshShelfLegalWeight } from "@/server/modules/warehouse/application/use-cases/RefreshShelfLegalWeight";
import type { CreateNotification } from "../../application/use-cases/CreateNotification";
import { NotificationType } from "../../domain/entities/Notification";

// Sends a warning notification if any of the shelves have been tampered with.
export class ShelvesModifiedIllegallyMonitoringTask implements SchedulerTask {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelves: GetAllShelves,
		private readonly createNotification: CreateNotification,
		private readonly refreshShelfLegalWeight: RefreshShelfLegalWeight
	) {}

	getName() {
		return "ShelvesModifiedIllegallyMonitoringTask";
	}

	async execute() {
		const allAssortments = await this.getAllAssortment.execute();
		const shelves = await this.getShelves.execute({ assortmentContext: allAssortments });

		for (const shelf of shelves) {
			if (!shelf.hasBeenChangedIllegally) continue;

			const totalShelfWeightKg = shelf.cells.flat().reduce((sum, cell) => sum + (cell.assortment?.weightKg ?? 0), 0);

			await this.createNotification.execute({
				type: NotificationType.ALERT,
				title: "Wykryto nieautoryzowane zdjęcie przedmiotu z magazynu.",
				message: `Szafka "${shelf.name}" podczas ostatniej autoryzowanej modyfikacji posiadała łączną wage ${shelf.lastRecordedLegalWeightKg}kg. Teraz jednak, zawarte w niej asortymenty ważą ${totalShelfWeightKg}kg. Świadczy to o tym, że musiało dojść do modyfikacji stanu magazynu, bez powiadomienia o tym systemu, lub awarii niektórych czujników (jeśli takie występują). Te powiadomienie nie zostanie wysłane ponownie, a system od teraz założy, że nowa waga jest legalna. Jeśli utracony przedmiot zostanie przywrócony, powinien on zostać dodany według klasycznych procedur obsługi systemu.`,
			});
			await this.refreshShelfLegalWeight.execute({ id: shelf.id, assortmentContext: allAssortments });
		}
	}
}
