import { UUID } from "@/server/utils";
import { NotificationDTO } from "../../application/dto/shared/NotificationDTO";
import { Notification } from "../../domain/entities/Notification";
import { DBNotification } from "../entities/DBNotification";

export class NotificationMapper {
	static fromDTOToEntity(dto: NotificationDTO): Notification {
		const { id, type, issuedDateTimestamp, title, message } = dto;
		return Notification.create(
			UUID.fromString(id),
			type,
			new Date(issuedDateTimestamp),
			title,
			message,
		);
	}

	static fromEntityToDTO(entity: Notification): NotificationDTO {
		const { id, type, issuedDate, title, message } = entity;
		return {
			id: id.value,
			type,
			issuedDateTimestamp: issuedDate.getTime(),
			title,
			message,
		};
	}

	static fromEntityToDB(entity: Notification): DBNotification {
		const dbObject = new DBNotification();
		const { id, type, issuedDate, title, message } = entity;

		dbObject.id = id.value;
		dbObject.type = type;
		dbObject.issuedDate = issuedDate;
		dbObject.title = title;
		dbObject.message = message;

		return dbObject;
	}

	static fromDBToEntity(db: DBNotification): Notification {
		return Notification.create(
			UUID.fromString(db.id),
			db.type,
			db.issuedDate,
			db.title,
			db.message,
		);
	}
}
