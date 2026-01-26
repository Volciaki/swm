import { CelsiusDegrees, UUID } from "@/server/utils";
import type { TemperatureReadingDTO } from "../../application/dto/shared/TemperatureReadingDTO";
import { TemperatureReading } from "../../domain/entities/TemperatureReading";
import { DBTemperatureReading } from "../entities/DBTemperatureReading";
import type { Shelf } from "../../domain/entities/Shelf";
import { ShelfMapper } from "./ShelfMapper";

export class TemperatureReadingMapper {
	static fromDTOToEntity(dto: TemperatureReadingDTO): TemperatureReading {
		const { id, shelf, dateTimestamp, temperatureCelsius, temperatureWasTooHigh, temperatureWasTooLow } = dto;
		return TemperatureReading.create(
			UUID.fromString(id),
			ShelfMapper.fromShelfDTOToShelf(shelf),
			new Date(dateTimestamp),
			CelsiusDegrees.fromNumber(temperatureCelsius),
			temperatureWasTooHigh,
			temperatureWasTooLow
		);
	}

	static fromEntityToDTO(entity: TemperatureReading): TemperatureReadingDTO {
		const { id, shelf, date, temperature, temperatureWasTooLow, temperatureWasTooHigh } = entity;
		return {
			id: id.value,
			shelf: ShelfMapper.fromShelfToShelfDTO(shelf),
			dateTimestamp: date.getTime(),
			temperatureCelsius: temperature.value,
			temperatureWasTooHigh,
			temperatureWasTooLow,
		};
	}

	static fromDBToEntity(db: DBTemperatureReading, shelfContext: Shelf): TemperatureReading {
		const { id, date, temperatureCelsius, temperatureWasTooHigh, temperatureWasTooLow } = db;
		return TemperatureReading.create(
			UUID.fromString(id),
			shelfContext,
			new Date(date),
			CelsiusDegrees.fromNumber(temperatureCelsius),
			temperatureWasTooHigh,
			temperatureWasTooLow
		);
	}

	static fromEntityToDB(entity: TemperatureReading): DBTemperatureReading {
		const dbObject = new DBTemperatureReading();

		dbObject.id = entity.id.value;
		dbObject.shelfId = entity.shelf.id.value;
		dbObject.date = entity.date;
		dbObject.temperatureCelsius = entity.temperature.value;
		dbObject.temperatureWasTooHigh = entity.temperatureWasTooHigh;
		dbObject.temperatureWasTooLow = entity.temperatureWasTooLow;

		return dbObject;
	}
}
