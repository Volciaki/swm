import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { UpdateShelfDTO } from "../dto/UpdateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { CellMapper } from "../../infrastructure/mappers/CellMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

export type UpdateShelfOptions = {
	skipAuthentication: boolean;
};

export class UpdateShelf {
	constructor(
        private readonly shelfHelper: ShelfHelper,
        private readonly shelfRepository: ShelfRepository,
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
			hasBeenChangedIllegally: false,
		});

		const { name, comment, maxAssortmentSize, maxWeight, temperatureRange, supportsHazardous, currentTemperature } = newShelf
		shelf.name = name;
		shelf.comment = comment;
		shelf.maxAssortmentSize = maxAssortmentSize;
		shelf.maxWeight = maxWeight;
		shelf.temperatureRange = temperatureRange;
		shelf.supportsHazardous = supportsHazardous;
		shelf.currentTemperature = currentTemperature;
		shelf.validate();
		await this.shelfRepository.update(shelf);

		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
