import type { SchedulerTask } from "@/server/scheduler/task";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { assortmentDTOsToAssortmentVOs } from "@/server/utils";
import type { GetAllShelves } from "../../application/use-cases/GetAllShelves";
import { ShelfMapper } from "../mappers/ShelfMapper";
import type { UpdateShelf } from "../../application/use-cases/UpdateShelf";
import type { ShelfScale } from "../../domain/services/ShelfScale";
import type { StoreWeightReading } from "../../application/use-cases/StoreWeightReading";

export class UpdateShelfWeightsTask implements SchedulerTask {
	constructor(
		private readonly getAllShelves: GetAllShelves,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly shelfScale: ShelfScale,
		private readonly updateShelf: UpdateShelf,
		private readonly storeWeightReading: StoreWeightReading
	) {}

	getName() {
		return "UpdateShelfWeightsTask";
	}

	async execute() {
		const shelfDTOs = await this.getAllShelves.execute();
		const assortments = await this.getAllAssortment.execute();
		const assortmentContext = assortmentDTOsToAssortmentVOs(assortments);

		for (const shelfDTO of shelfDTOs) {
			const shelf = ShelfMapper.fromShelfDTOToShelf(shelfDTO);

			const newWeight = await this.shelfScale.getWeightForShelf(shelf);
			await this.updateShelf.execute(
				{
					shelf: { id: shelf.id.value, assortmentContext },
					newData: {
						...shelfDTO,
						currentWeightKilograms: newWeight.kilograms.value,
					},
				},
				{ skipAuthentication: true }
			);

			await this.storeWeightReading.execute({ id: shelf.id.value, assortmentContext });
		}
	}
}
