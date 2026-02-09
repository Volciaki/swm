import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { DeleteShelfDTO } from "../dto/DeleteShelfDTO";
import type { ShelfHelper } from "../helpers/ShelfHelper";
import type { WeightReadingRepository } from "../../domain/repositories/WeightReadingRepository";
import type { TemperatureReadingRepository } from "../../domain/repositories/TemperatureReadingRepository";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { NotEnoughShelves } from "../errors/NotEnoughShelves";

type DeleteShelfOptions = {
	enforceMinimalAmountOfShelves: boolean;
};

// Ensures that at least ... shelves need to be defined.
const MINIMAL_AMOUNT_OF_SHELVES = 4;

export class DeleteShelf {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly shelfRepository: ShelfRepository,
		private readonly temperatureReadingRepository: TemperatureReadingRepository,
		private readonly weightReadingRepository: WeightReadingRepository
	) {}

	async execute(dto: DeleteShelfDTO, currentUser?: UserDTO, optionsUnsafe?: DeleteShelfOptions) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const options: DeleteShelfOptions = {
			enforceMinimalAmountOfShelves: true,
			...optionsUnsafe,
		};

		const currentShelves = await this.shelfRepository.getAll();
		if (options.enforceMinimalAmountOfShelves && currentShelves.length <= MINIMAL_AMOUNT_OF_SHELVES)
			throw new NotEnoughShelves({ minimalAmountOfShelves: MINIMAL_AMOUNT_OF_SHELVES });

		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);

		for (const temperatureReadingId of shelf.temperatureReadingIds) {
			const temperatureReading = await this.temperatureReadingRepository.getById(
				temperatureReadingId,
				async (uuid) => await this.shelfHelper.getByIdStringOrThrow(uuid.value, dto.assortmentContext)
			);

			if (!temperatureReading) continue;

			await this.temperatureReadingRepository.delete(temperatureReading);
		}

		for (const weightReadingId of shelf.weightReadingIds) {
			const weightReading = await this.weightReadingRepository.getById(
				weightReadingId,
				async (uuid) => await this.shelfHelper.getByIdStringOrThrow(uuid.value, dto.assortmentContext)
			);

			if (!weightReading) continue;

			await this.weightReadingRepository.delete(weightReading);
		}

		await this.shelfRepository.delete(shelf);
	}
}
