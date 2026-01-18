import { UUIDManager } from "@/server/utils";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationMapper } from "../../infrastructure/mappers/NotificationMapper";
import { CreateNotificationDTO } from "../dto/CreateNotificationDTO";

export class CreateNotification {
	constructor(
        private readonly uuidManager: UUIDManager,
        private readonly notificationRepository: NotificationRepository,
   	) {}

	async execute(dto: CreateNotificationDTO) {
		const { type, title, message } = dto;
		const notification = NotificationMapper.fromDTOToEntity({
			id: this.uuidManager.generate().value,
			issuedDateTimestamp: (new Date()).getTime(),
			type,
			title,
			message,
		});

		await this.notificationRepository.create(notification);
		return NotificationMapper.fromEntityToDTO(notification);
	}
}
