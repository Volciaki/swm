import { DimensionsMapper, TemperatureRangeMapper, TimeFrame, UUID, Weight } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { DBAssortment } from "../entities/DBAssortment";
import { AssortmentDTO } from "../../application/dto/shared/AssortmentDTO";

export class AssortmentMapper {
	static fromAssortmentToDBAssortment(assortment: Assortment): DBAssortment {
		const dbAssortment = new DBAssortment();

		const { id, cellId, shelfId, name, size, weight, comment, storedAt, expiresAfter, temperatureRange, isHazardous } = assortment;
		dbAssortment.id = id.value;
		dbAssortment.cellId = cellId.value;
		dbAssortment.shelfId = shelfId.value;
		dbAssortment.name = name;
		dbAssortment.sizeWidthMillimeters = size.width.millimeters.value;
		dbAssortment.sizeHeightMillimeters = size.height.millimeters.value;
		dbAssortment.sizeLengthMillimeters = size.length.millimeters.value;
		dbAssortment.weightKg = weight.kilograms.value;
		dbAssortment.comment = comment;
		dbAssortment.storedAt = storedAt;
		dbAssortment.expiresAfterSeconds = expiresAfter.seconds.value;
		dbAssortment.temperatureRangeMin = temperatureRange.minimal.value;
		dbAssortment.temperatureRangeMax = temperatureRange.maximal.value;
		dbAssortment.isHazardous = isHazardous;

		return dbAssortment;
	}

	static fromDBAssortmentToAssortment(dbAssortment: DBAssortment): Assortment {
		return Assortment.create(
			UUID.fromString(dbAssortment.id),
			UUID.fromString(dbAssortment.cellId),
			UUID.fromString(dbAssortment.shelfId),
			dbAssortment.name,
			TemperatureRangeMapper.fromDTO({
				minimalCelsius: dbAssortment.temperatureRangeMin,
				maximalCelsius: dbAssortment.temperatureRangeMax,
			}),
			Weight.fromKilograms(dbAssortment.weightKg),
			DimensionsMapper.fromDTO({
				widthMillimeters: dbAssortment.sizeWidthMillimeters,
				heightMillimeters: dbAssortment.sizeHeightMillimeters,
				lengthMillimeters: dbAssortment.sizeLengthMillimeters,
			}),
			dbAssortment.comment,
			dbAssortment.storedAt,
			TimeFrame.fromSeconds(dbAssortment.expiresAfterSeconds),
			dbAssortment.isHazardous,
		);
	}

	static fromAssortmentToAssortmentDTO(assortment: Assortment): AssortmentDTO {
		return {
			id: assortment.id.value,
			cellId: assortment.cellId.value,
			shelfId: assortment.shelfId.value,
			name: assortment.name,
			temperatureRange: TemperatureRangeMapper.toDTO(assortment.temperatureRange),
			weightKg: assortment.weight.kilograms.value,
			size: DimensionsMapper.toDTO(assortment.size),
			comment: assortment.comment,
			storedAtTimestamp: assortment.storedAt.getTime(),
			expiresAfterSeconds: assortment.expiresAfter.seconds.value,
			isHazardous: assortment.isHazardous,
		};
	}

	static fromAssortmentDTOToAssortment(assortmentDTO: AssortmentDTO): Assortment {
		return Assortment.create(
			UUID.fromString(assortmentDTO.id),
			UUID.fromString(assortmentDTO.cellId),
			UUID.fromString(assortmentDTO.shelfId),
			assortmentDTO.name,
			TemperatureRangeMapper.fromDTO(assortmentDTO.temperatureRange),
			Weight.fromKilograms(assortmentDTO.weightKg),
			DimensionsMapper.fromDTO(assortmentDTO.size),
			assortmentDTO.comment,
			new Date(assortmentDTO.storedAtTimestamp),
			TimeFrame.fromSeconds(assortmentDTO.expiresAfterSeconds),
			assortmentDTO.isHazardous,
		);
	}
}
