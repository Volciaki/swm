import type { TemperatureReadingRepository } from "../../domain/repositories/TemperatureReadingRepository";
import { TemperatureReadingMapper } from "../../infrastructure/mappers/TemperatureReadingMapper";
import type { GetShelfTemperatureReadingsResponseDTO } from "../dto/GetShelfTemperatureReadingsDTOResponse";
import type { GetShelfTemperatureReadingsDTO } from "../dto/GetShelfTemperatureReadingsDTO";
import type { ShelfHelper } from "../helpers/ShelfHelper";

export class GetShelfTemperatureReadings {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly temperatureReadingRepository: TemperatureReadingRepository
	) {}

	async execute(dto: GetShelfTemperatureReadingsDTO): Promise<GetShelfTemperatureReadingsResponseDTO> {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);

		const temperatureReadings = shelf.temperatureReadingIds.map(
			async (id) => await this.temperatureReadingRepository.getById(id, async () => shelf)
		);
		const temperatureReadingsFetched = await Promise.all(temperatureReadings);
		return temperatureReadingsFetched
			.filter((temperatureReading) => temperatureReading !== null)
			.map((temperatureReading) => TemperatureReadingMapper.fromEntityToDTO(temperatureReading));
	}
}
