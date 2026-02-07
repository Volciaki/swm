import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import type { UpdateShelfDTO } from "../dto/UpdateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { CellMapper } from "../../infrastructure/mappers/CellMapper";
import type { ShelfHelper } from "../helpers/ShelfHelper";

export type UpdateShelfOptions = {
	skipAuthentication: boolean;
};

export class UpdateShelf {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly shelfRepository: ShelfRepository
	) {}

	async execute(dto: UpdateShelfDTO, optionsUnsafe?: UpdateShelfOptions, currentUser?: UserDTO) {
		const options: UpdateShelfOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.shelf.id, dto.shelf.assortmentContext);

		const newShelf = ShelfMapper.fromShelfDTOToShelf({
			...dto.newData,
			id: shelf.id.value,
			cells: shelf.cells.map((row) => row.map((cell) => CellMapper.fromCellToCellDTO(cell))),
			lastRecordedLegalWeightKg: shelf.lastRecordedLegalWeight.kilograms.value,
			temperatureReadingIds: shelf.temperatureReadingIds.map((id) => id.value),
			weightReadingIds: shelf.weightReadingIds.map((id) => id.value),
			hasBeenChangedIllegally: false,
		});

		shelf.name = newShelf.name;
		shelf.comment = newShelf.comment;
		shelf.maxAssortmentSize = newShelf.maxAssortmentSize;
		shelf.maxWeight = newShelf.maxWeight;
		shelf.temperatureRange = newShelf.temperatureRange;
		shelf.supportsHazardous = newShelf.supportsHazardous;
		shelf.currentTemperature = newShelf.currentTemperature;
		shelf.currentWeight = newShelf.currentWeight;
		shelf.validate();
		await this.shelfRepository.update(shelf);

		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
