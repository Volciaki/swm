import { isValidEnumValue, UUID } from "@/server/utils";
import { InvalidNotificationTypeValue } from "../errors/InvalidNotificationTypeValue";

export enum NotificationType {
	ALERT = "ALERT",
	REMINDER = "REMINDER",
};

const stringIsNotificationType = (value: string) => isValidEnumValue(NotificationType, value);

export class Notification {
	private constructor(
        private readonly _id: UUID,
        private readonly _type: NotificationType,
        private readonly _issuedDate: Date,
        private readonly _title: string,
        private readonly _message: string,
	) {}

	static create(
		id: UUID,
		type: string,
		issuedDate: Date,
		title: string,
		message: string,
	) {
		if (!stringIsNotificationType(type)) throw new InvalidNotificationTypeValue(type);

		return new Notification(id, type, issuedDate, title, message);
	}

	get id() { return this._id };
	get type() { return this._type };
	get issuedDate() { return this._issuedDate };
	get title() { return this._title };
	get message() { return this._message };
}
