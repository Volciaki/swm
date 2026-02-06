import type { UUIDManager } from "@/server/utils";
import { UUID } from "@/server/utils";
import type { Shelf } from "../../domain/entities/Shelf";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";
import type { AssortmentVO } from "../../domain/vo/AssortmentVO";
import type { CellDTO } from "../dto/shared/CellDTO";
import type { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import type { ShelfThermometer } from "../../domain/services/ShelfThermometer";

const generateCellDTOsForShape = (
	shape: { columns: number; rows: number },
	uuidGenerator: () => UUID,
	shelfId: UUID
): CellDTO[][] => {
	const shelfCellDTOs: CellDTO[][] = [];

	for (let y = 0; y < shape.rows; y++) {
		const row: CellDTO[] = [];
		for (let x = 0; x < shape.columns; x++) {
			row.push({
				id: uuidGenerator().value,
				shelfId: shelfId.value,
				assortment: null,
				index: x + y * shape.columns,
				x,
				y,
			});
		}
		shelfCellDTOs.push(row);
	}

	return shelfCellDTOs;
};

export interface ShelfHelper {
	getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]): Promise<Shelf>;
	createByDTO(dto: CreateShelfDTO): Promise<Shelf>;
}

export class DefaultShelfHelper implements ShelfHelper {
	constructor(
		private readonly shelfRepository: ShelfRepository,
		private readonly uuidManager: UUIDManager,
		private readonly shelfThermometer: ShelfThermometer
	) {}

	async getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]) {
		const shelfId = UUID.fromString(id);
		const shelf = await this.shelfRepository.getById(shelfId, assortmentContext);

		if (shelf === null) throw new ShelfNotFoundError({ id: shelfId.value });

		return shelf;
	}

	async createByDTO(dto: CreateShelfDTO) {
		const shelfId = this.uuidManager.generate();
		const shelfCellDTOs = generateCellDTOsForShape(dto.cellsShape, this.uuidManager.generate, shelfId);
		const shelf = ShelfMapper.fromShelfDTOToShelf({
			...dto,
			id: shelfId.value,
			cells: shelfCellDTOs,
			lastRecordedLegalWeightKg: 0,
			temperatureReadingIds: [],
			currentTemperatureCelsius: dto.temperatureRange.minimalCelsius,
			hasBeenChangedIllegally: false,
		});

		const initialShelfTemperature = await this.shelfThermometer.getInitialTemperatureForShelf(shelf);
		shelf.currentTemperature =
			initialShelfTemperature === null
				? await this.shelfThermometer.getTemperatureForShelf(shelf)
				: initialShelfTemperature;

		await this.shelfRepository.create(shelf);
		return shelf;
	}
}
