import { NotificationType } from "../entities/Notification";
import { MonitoringDomainError } from "./MonitoringDomainError";

export class InvalidNotificationTypeValue extends MonitoringDomainError {
	constructor(value: string) {
		super(`${value} is not a valid value of a Notification's type! Possible choices are: ${Object.values(NotificationType)}.`);
	}
}
