import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationMapper } from "../../infrastructure/mappers/NotificationMapper";

export class GetNotifications {
	constructor(private readonly notificationsRepository: NotificationRepository) {}

	async execute(currentUser?: UserDTO) {
		if (!currentUser) throw new UnauthorizedError();

		const notifications = await this.notificationsRepository.getAll();
		return notifications
			.sort((a, b) => b.issuedDate.getTime() - a.issuedDate.getTime())
			.map((notification) => NotificationMapper.fromEntityToDTO(notification));
	}
}
