import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { DimensionsMapper, TemperatureRangeMapper, TimeFrame, UUID, Weight } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { DBAssortment } from "../entities/DBAssortment";
import { AssortmentDTO } from "../../application/dto/shared/AssortmentDTO";

export class AssortmentMapper {
	static fromAssortmentToDBAssortment(assortment: Assortment): DBAssortment {
		const dbAssortment = new DBAssortment();

		dbAssortment.id = assortment.id.value;
		dbAssortment.cellId = assortment.cellId.value;
		dbAssortment.shelfId = assortment.shelfId.value;
		dbAssortment.name = assortment.name;
		dbAssortment.sizeWidthMillimeters = assortment.size.width.millimeters.value;
		dbAssortment.sizeHeightMillimeters = assortment.size.height.millimeters.value;
		dbAssortment.sizeLengthMillimeters = assortment.size.length.millimeters.value;
		dbAssortment.weightKg = assortment.weight.kilograms.value;
		dbAssortment.comment = assortment.comment;
		dbAssortment.storedAt = assortment.storedAt;
		dbAssortment.expiresAfterSeconds = assortment.expiresAfter.seconds.value;
		dbAssortment.temperatureRangeMin = assortment.temperatureRange.minimal.value;
		dbAssortment.temperatureRangeMax = assortment.temperatureRange.maximal.value;
		dbAssortment.isHazardous = assortment.isHazardous;
		dbAssortment.imageFileReferenceId = assortment.image?.id.value ?? null;
		dbAssortment.qrCodeFileReferenceId = assortment.qrCode.id.value;
		dbAssortment.isCloseToExpiration = assortment.isCloseToExpiration;
		dbAssortment.isCloseToExpirationNotificationId = assortment.isCloseToExpirationNotification === null
			? null
			: assortment.isCloseToExpirationNotification.id;
		dbAssortment.hasExpired = assortment.hasExpired;
		dbAssortment.hasExpiredNotificationId = assortment.hasExpiredNotification === null
			? null
			: assortment.hasExpiredNotification.id;

		return dbAssortment;
	}

	static fromDBAssortmentToAssortment(dbAssortment: DBAssortment, qrCode: FileReference, image: FileReference | null): Assortment {
		return Assortment.create(
			UUID.fromString(dbAssortment.id),
			UUID.fromString(dbAssortment.cellId),
			UUID.fromString(dbAssortment.shelfId),
			dbAssortment.name,
			qrCode,
			image,
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
			dbAssortment.hasExpired,
			dbAssortment.hasExpiredNotificationId === null ? null : { id: dbAssortment.hasExpiredNotificationId },
			dbAssortment.isCloseToExpiration,
			dbAssortment.isCloseToExpirationNotificationId === null ? null : { id: dbAssortment.isCloseToExpirationNotificationId },
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
			image: assortment.image === null ? null : FileReferenceMapper.fromEntityToDTO(assortment.image),
			qrCode: FileReferenceMapper.fromEntityToDTO(assortment.qrCode),
			hasExpired: assortment.hasExpired,
			hasExpiredNotification: assortment.hasExpiredNotification === null
				? null
				: { id: assortment.hasExpiredNotification.id },
			isCloseToExpiration: assortment.isCloseToExpiration,
			isCloseToExpirationNotification: assortment.isCloseToExpirationNotification === null
				? null
				: { id: assortment.isCloseToExpirationNotification.id },
		};
	}

	static fromAssortmentDTOToAssortment(assortmentDTO: AssortmentDTO): Assortment {
		return Assortment.create(
			UUID.fromString(assortmentDTO.id),
			UUID.fromString(assortmentDTO.cellId),
			UUID.fromString(assortmentDTO.shelfId),
			assortmentDTO.name,
			FileReferenceMapper.fromDTOToEntity(assortmentDTO.qrCode),
			assortmentDTO.image === null ? null : FileReferenceMapper.fromDTOToEntity(assortmentDTO.image),
			TemperatureRangeMapper.fromDTO(assortmentDTO.temperatureRange),
			Weight.fromKilograms(assortmentDTO.weightKg),
			DimensionsMapper.fromDTO(assortmentDTO.size),
			assortmentDTO.comment,
			new Date(assortmentDTO.storedAtTimestamp),
			TimeFrame.fromSeconds(assortmentDTO.expiresAfterSeconds),
			assortmentDTO.isHazardous,
			assortmentDTO.hasExpired,
			assortmentDTO.hasExpiredNotification,
			assortmentDTO.isCloseToExpiration,
			assortmentDTO.isCloseToExpirationNotification,
		);
	}
}
