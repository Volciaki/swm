import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { NotificationType } from "../entities/Notification";
import { MonitoringDomainError } from "./MonitoringDomainError";

export class InvalidNotificationTypeValue extends MonitoringDomainError<ErrorName.INVALID_NOTIFICATION_TYPE_VALUE> {
	constructor(value: ErrorMetadataValue[ErrorName.INVALID_NOTIFICATION_TYPE_VALUE]) {
		super({
			error: {
				code: "BAD_REQUEST",
				message: `${value.type} is not a valid value of a Notification's type! Possible choices are: ${Object.values(NotificationType)}.`,
			},
			metadata: {
				name: ErrorName.INVALID_NOTIFICATION_TYPE_VALUE,
				value,
			},
		});
	}
}
