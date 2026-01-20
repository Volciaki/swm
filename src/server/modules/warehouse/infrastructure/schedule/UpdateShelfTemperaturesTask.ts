import { SchedulerTask } from "@/server/scheduler/task";
import { StoreTemperatureReading } from "../../application/use-cases/StoreTemperatureReading";
import { GetAllShelves } from "../../application/use-cases/GetAllShelves";
import { ShelfThermometer } from "../../domain/services/ShelfThermometer";
import { ShelfMapper } from "../mappers/ShelfMapper";
import { UpdateShelf } from "../../application/use-cases/UpdateShelf";

export class UpdateShelfTemperaturesTask implements SchedulerTask {
	constructor(
		private readonly getAllShelves: GetAllShelves,
		private readonly shelfThermometer: ShelfThermometer,
		private readonly updateShelf: UpdateShelf,
		private readonly storeTemperatureReading: StoreTemperatureReading,
	) { }

	getName() { return "UpdateShelfTemperaturesTask" };
	getIntervalMilliseconds() { return 60 * 1000 };

	async execute() {
		const shelfDTOs = await this.getAllShelves.execute();

		for (const shelfDTO of shelfDTOs) {
			const shelf = ShelfMapper.fromShelfDTOToShelf(shelfDTO);

			const newTemperature = await this.shelfThermometer.getTemperatureForShelf(shelf);
			await this.updateShelf.execute(
				{
					shelf: { id: shelf.id.value, assortmentContext: [] },
					newData: {
						...shelfDTO,
						currentTemperatureCelsius: newTemperature.value,
					},
				},
				{ skipAuthentication: true },
			);

			await this.storeTemperatureReading.execute({ id: shelf.id.value, assortmentContext: [] });
		}
	}
}
