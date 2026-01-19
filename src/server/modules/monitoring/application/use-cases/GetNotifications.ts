import { UnauthorizedError, UserDTO } from "@/server/utils";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationMapper } from "../../infrastructure/mappers/NotificationMapper";

export class GetNotifications {
	constructor(private readonly notificationsRepository: NotificationRepository) {}

	async execute(currentUser?: UserDTO) {
		if (!currentUser) throw new UnauthorizedError();

		const notifications = await this.notificationsRepository.getAll();
		return notifications.map((notification) => NotificationMapper.fromEntityToDTO(notification));
	}
}
