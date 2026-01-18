import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { DBNotification } from "../entities/DBNotification";
import { Notification } from "../../domain/entities/Notification";
import { NotificationMapper } from "../mappers/NotificationMapper";

export class DBNotificationRepository implements NotificationRepository {
	constructor( private readonly db: Repository<DBNotification>) {}

	async create(notification: Notification) {
		const dbObject = NotificationMapper.fromEntityToDB(notification);
		await this.db.save(dbObject);
	}

	async update(notification: Notification) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(notification);
	}

	async delete(notification: Notification) {
		const dbShelf = await this.db.findOneBy({ id: notification.id.value });

		if (dbShelf === null) return;

		await this.db.remove(dbShelf);
	}

	async getById(id: UUID) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		return NotificationMapper.fromDBToEntity(dbObject );
	}

	async getAll() {
		const notifications = await this.db.find();
		return notifications.map((notification) => NotificationMapper.fromDBToEntity(notification));
	}
}
