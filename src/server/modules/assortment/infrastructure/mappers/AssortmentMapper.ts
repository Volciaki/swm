import { UUID } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { DBAssortment } from "../entities/DBAssortment";
import type { AssortmentDTO } from "../../application/dto/shared/AssortmentDTO";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";
import { AssortmentDefinitionMapper } from "./AssortmentDefinitionMapper";

export class AssortmentMapper {
	static fromAssortmentToDBAssortment(assortment: Assortment): DBAssortment {
		const dbAssortment = new DBAssortment();

		dbAssortment.id = assortment.id.value;
		dbAssortment.cellId = assortment.cellId.value;
		dbAssortment.shelfId = assortment.shelfId.value;
		dbAssortment.definitionId = assortment.definition.id.value;
		dbAssortment.storedAt = assortment.storedAt;
		dbAssortment.isCloseToExpiration = assortment.isCloseToExpiration;
		dbAssortment.isCloseToExpirationNotificationId =
			assortment.isCloseToExpirationNotification === null ? null : assortment.isCloseToExpirationNotification.id;
		dbAssortment.hasExpired = assortment.hasExpired;
		dbAssortment.hasExpiredNotificationId =
			assortment.hasExpiredNotification === null ? null : assortment.hasExpiredNotification.id;

		return dbAssortment;
	}

	static fromDBAssortmentToAssortment(
		dbAssortment: DBAssortment,
		assortmentDefinition: AssortmentDefinition
	): Assortment {
		return Assortment.create(
			UUID.fromString(dbAssortment.id),
			UUID.fromString(dbAssortment.cellId),
			UUID.fromString(dbAssortment.shelfId),
			assortmentDefinition,
			dbAssortment.storedAt,
			dbAssortment.hasExpired,
			dbAssortment.hasExpiredNotificationId === null ? null : { id: dbAssortment.hasExpiredNotificationId },
			dbAssortment.isCloseToExpiration,
			dbAssortment.isCloseToExpirationNotificationId === null
				? null
				: { id: dbAssortment.isCloseToExpirationNotificationId }
		);
	}

	static fromAssortmentToAssortmentDTO(assortment: Assortment): AssortmentDTO {
		return {
			id: assortment.id.value,
			cellId: assortment.cellId.value,
			shelfId: assortment.shelfId.value,
			definition: AssortmentDefinitionMapper.fromEntityToDTO(assortment.definition),
			storedAtTimestamp: assortment.storedAt.getTime(),
			hasExpired: assortment.hasExpired,
			hasExpiredNotification:
				assortment.hasExpiredNotification === null ? null : { id: assortment.hasExpiredNotification.id },
			isCloseToExpiration: assortment.isCloseToExpiration,
			isCloseToExpirationNotification:
				assortment.isCloseToExpirationNotification === null
					? null
					: { id: assortment.isCloseToExpirationNotification.id },
		};
	}

	static fromAssortmentDTOToAssortment(assortmentDTO: AssortmentDTO): Assortment {
		return Assortment.create(
			UUID.fromString(assortmentDTO.id),
			UUID.fromString(assortmentDTO.cellId),
			UUID.fromString(assortmentDTO.shelfId),
			AssortmentDefinitionMapper.fromDTOToEntity(assortmentDTO.definition),
			new Date(assortmentDTO.storedAtTimestamp),
			assortmentDTO.hasExpired,
			assortmentDTO.hasExpiredNotification,
			assortmentDTO.isCloseToExpiration,
			assortmentDTO.isCloseToExpirationNotification
		);
	}
}
