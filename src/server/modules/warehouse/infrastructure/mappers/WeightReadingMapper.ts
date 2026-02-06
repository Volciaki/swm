import { UUID, Weight } from "@/server/utils";
import type { Shelf } from "../../domain/entities/Shelf";
import { ShelfMapper } from "./ShelfMapper";
import type { WeightReadingDTO } from "../../application/dto/shared/WeightReadingDTO";
import { WeightReading } from "../../domain/entities/WeightReading";
import { DBWeightReading } from "../entities/DBWeightReading";

export class WeightReadingMapper {
	static fromDTOToEntity(dto: WeightReadingDTO): WeightReading {
		const { id, shelf, dateTimestamp, weightKilograms } = dto;
		return WeightReading.create(
			UUID.fromString(id),
			ShelfMapper.fromShelfDTOToShelf(shelf),
			new Date(dateTimestamp),
			Weight.fromKilograms(weightKilograms)
		);
	}

	static fromEntityToDTO(entity: WeightReading): WeightReadingDTO {
		const { id, shelf, date, weight } = entity;
		return {
			id: id.value,
			shelf: ShelfMapper.fromShelfToShelfDTO(shelf),
			dateTimestamp: date.getTime(),
			weightKilograms: weight.kilograms.value,
		};
	}

	static fromDBToEntity(db: DBWeightReading, shelfContext: Shelf): WeightReading {
		const { id, date, weightKilograms } = db;
		return WeightReading.create(
			UUID.fromString(id),
			shelfContext,
			new Date(date),
			Weight.fromKilograms(weightKilograms)
		);
	}

	static fromEntityToDB(entity: WeightReading): DBWeightReading {
		const dbObject = new DBWeightReading();

		dbObject.id = entity.id.value;
		dbObject.shelfId = entity.shelf.id.value;
		dbObject.date = entity.date;
		dbObject.weightKilograms = entity.weight.kilograms.value;

		return dbObject;
	}
}
