import type { UUIDManager } from "@/server/utils";
import type { ShelfHelper } from "../helpers/ShelfHelper";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import type { StoreWeightReadingDTO } from "../dto/StoreWeightReadingDTO";
import type { StoreWeightReadingResponseDTO } from "../dto/StoreWeightReadingResponseDTO";
import type { WeightReadingRepository } from "../../domain/repositories/WeightReadingRepository";
import { WeightReading } from "../../domain/entities/WeightReading";
import { WeightReadingMapper } from "../../infrastructure/mappers/WeightReadingMapper";

export class StoreWeightReading {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly uuidManager: UUIDManager,
		private readonly weightReadingRepository: WeightReadingRepository,
		private readonly shelfRepository: ShelfRepository
	) {}

	async execute(dto: StoreWeightReadingDTO): Promise<StoreWeightReadingResponseDTO> {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);

		const weightReading = WeightReading.createNew(this.uuidManager.generate(), shelf);
		shelf.addWeightReading(weightReading);

		await this.weightReadingRepository.create(weightReading);
		await this.shelfRepository.update(shelf);

		return WeightReadingMapper.fromEntityToDTO(weightReading);
	}
}
