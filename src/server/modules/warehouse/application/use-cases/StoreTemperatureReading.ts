import type { UUIDManager } from "@/server/utils";
import { TemperatureReading } from "../../domain/entities/TemperatureReading";
import type { StoreTemperatureReadingResponseDTO } from "../dto/StoreTemperatureReadingResponseDTO";
import type { StoreTemperatureReadingDTO } from "../dto/StoreTemperatureReadingDTO";
import type { ShelfHelper } from "../helpers/ShelfHelper";
import { TemperatureReadingMapper } from "../../infrastructure/mappers/TemperatureReadingMapper";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import type { TemperatureReadingRepository } from "../../domain/repositories/TemperatureReadingRepository";

export class StoreTemperatureReading {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly uuidManager: UUIDManager,
		private readonly temperatureReadingRepository: TemperatureReadingRepository,
		private readonly shelfRepository: ShelfRepository
	) {}

	async execute(dto: StoreTemperatureReadingDTO): Promise<StoreTemperatureReadingResponseDTO> {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);

		const temperatureReading = TemperatureReading.createNew(this.uuidManager.generate(), shelf, new Date());
		shelf.addTemperatureReading(temperatureReading);

		await this.temperatureReadingRepository.create(temperatureReading);
		await this.shelfRepository.update(shelf);

		return TemperatureReadingMapper.fromEntityToDTO(temperatureReading);
	}
}
