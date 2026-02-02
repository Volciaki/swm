import type { SchedulerTask } from "@/server/scheduler/task";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { assortmentDTOsToAssortmentVOs } from "@/server/utils";
import type { StoreTemperatureReading } from "../../application/use-cases/StoreTemperatureReading";
import type { GetAllShelves } from "../../application/use-cases/GetAllShelves";
import type { ShelfThermometer } from "../../domain/services/ShelfThermometer";
import { ShelfMapper } from "../mappers/ShelfMapper";
import type { UpdateShelf } from "../../application/use-cases/UpdateShelf";

export class UpdateShelfTemperaturesTask implements SchedulerTask {
	constructor(
		private readonly getAllShelves: GetAllShelves,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly shelfThermometer: ShelfThermometer,
		private readonly updateShelf: UpdateShelf,
		private readonly storeTemperatureReading: StoreTemperatureReading
	) {}

	getName() {
		return "UpdateShelfTemperaturesTask";
	}

	async execute() {
		const shelfDTOs = await this.getAllShelves.execute();
		const assortments = await this.getAllAssortment.execute();
		const assortmentContext = assortmentDTOsToAssortmentVOs(assortments);

		for (const shelfDTO of shelfDTOs) {
			const shelf = ShelfMapper.fromShelfDTOToShelf(shelfDTO);

			const newTemperature = await this.shelfThermometer.getTemperatureForShelf(shelf);
			await this.updateShelf.execute(
				{
					shelf: { id: shelf.id.value, assortmentContext },
					newData: {
						...shelfDTO,
						currentTemperatureCelsius: newTemperature.value,
					},
				},
				{ skipAuthentication: true }
			);

			await this.storeTemperatureReading.execute({ id: shelf.id.value, assortmentContext });
		}
	}
}
