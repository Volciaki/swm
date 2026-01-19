import { CelsiusDegrees, UUIDManager } from "@/server/utils";
import { TemperatureReading } from "../../domain/entities/TemperatureReading";
import { StoreTemperatureReadingResponseDTO } from "../dto/StoreTemperatureResponseReadingDTO";
import { StoreTemperatureReadingDTO } from "../dto/StoreTemperatureReadingDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { TemperatureReadingMapper } from "../../infrastructure/mappers/TemperatureReadingMapper";

export class StoreTemperatureReading {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly uuidManager: UUIDManager,
	) {}

	async execute(dto: StoreTemperatureReadingDTO): Promise<StoreTemperatureReadingResponseDTO> {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);

		const temperatureReading = TemperatureReading.createNew(
			this.uuidManager.generate(),
			shelf,
			new Date(),
			// TODO: ...
			CelsiusDegrees.fromNumber(0),
		);
		return TemperatureReadingMapper.fromEntityToDTO(temperatureReading);
	}
}
