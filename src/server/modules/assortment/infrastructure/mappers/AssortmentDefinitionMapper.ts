import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { DimensionsMapper, TemperatureRangeMapper, TimeFrame, UUID, Weight } from "@/server/utils";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";
import { DBAssortmentDefinition } from "../entities/DBAssortmentDefinition";
import type { AssortmentDefinitionDTO } from "../../application/dto/shared/AssortmentDefinitionDTO";

export class AssortmentDefinitionMapper {
	static fromEntityToDB(entity: AssortmentDefinition): DBAssortmentDefinition {
		const dbAssortment = new DBAssortmentDefinition();

		dbAssortment.id = entity.id.value;
		dbAssortment.name = entity.name;
		dbAssortment.sizeWidthMillimeters = entity.size.width.millimeters.value;
		dbAssortment.sizeHeightMillimeters = entity.size.height.millimeters.value;
		dbAssortment.sizeLengthMillimeters = entity.size.length.millimeters.value;
		dbAssortment.weightKg = entity.weight.kilograms.value;
		dbAssortment.comment = entity.comment;
		dbAssortment.expiresAfterSeconds = entity.expiresAfter.seconds.value;
		dbAssortment.temperatureRangeMin = entity.temperatureRange.minimal.value;
		dbAssortment.temperatureRangeMax = entity.temperatureRange.maximal.value;
		dbAssortment.isHazardous = entity.isHazardous;
		dbAssortment.imageFileReferenceId = entity.image?.id.value ?? null;
		dbAssortment.qrCodeFileReferenceId = entity.qrCode.id.value;

		return dbAssortment;
	}

	static fromDBToEntity(
		db: DBAssortmentDefinition,
		qrCode: FileReference,
		image: FileReference | null
	): AssortmentDefinition {
		return AssortmentDefinition.create(
			UUID.fromString(db.id),
			db.name,
			qrCode,
			image,
			TemperatureRangeMapper.fromDTO({
				minimalCelsius: db.temperatureRangeMin,
				maximalCelsius: db.temperatureRangeMax,
			}),
			Weight.fromKilograms(db.weightKg),
			DimensionsMapper.fromDTO({
				widthMillimeters: db.sizeWidthMillimeters,
				heightMillimeters: db.sizeHeightMillimeters,
				lengthMillimeters: db.sizeLengthMillimeters,
			}),
			db.comment,
			TimeFrame.fromSeconds(db.expiresAfterSeconds),
			db.isHazardous
		);
	}

	static fromEntityToDTO(entity: AssortmentDefinition): AssortmentDefinitionDTO {
		return {
			id: entity.id.value,
			isHazardous: entity.isHazardous,
			expiresAfterSeconds: entity.expiresAfter.seconds.value,
			name: entity.name,
			temperatureRange: TemperatureRangeMapper.toDTO(entity.temperatureRange),
			weightKg: entity.weight.kilograms.value,
			size: DimensionsMapper.toDTO(entity.size),
			comment: entity.comment,
			image: entity.image === null ? null : FileReferenceMapper.fromEntityToDTO(entity.image),
			qrCode: FileReferenceMapper.fromEntityToDTO(entity.qrCode),
		};
	}

	static fromDTOToEntity(dto: AssortmentDefinitionDTO): AssortmentDefinition {
		return AssortmentDefinition.create(
			UUID.fromString(dto.id),
			dto.name,
			FileReferenceMapper.fromDTOToEntity(dto.qrCode),
			dto.image === null ? null : FileReferenceMapper.fromDTOToEntity(dto.image),
			TemperatureRangeMapper.fromDTO(dto.temperatureRange),
			Weight.fromKilograms(dto.weightKg),
			DimensionsMapper.fromDTO(dto.size),
			dto.comment,
			TimeFrame.fromSeconds(dto.expiresAfterSeconds),
			dto.isHazardous
		);
	}
}
