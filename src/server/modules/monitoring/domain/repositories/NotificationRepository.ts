import { UUID } from "@/server/utils";
import { Notification } from "../entities/Notification";

export interface NotificationRepository {
    create(notification: Notification): Promise<void>;
    update(notification: Notification): Promise<void>;
    delete(notification: Notification): Promise<void>;
    getById(id: UUID): Promise<Notification | null>;
    getAll(): Promise<Notification[]>;
};
