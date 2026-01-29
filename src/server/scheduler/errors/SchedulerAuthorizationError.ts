import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { SchedulerError } from "./SchedulerError";

export class SchedulerAuthorizationError extends SchedulerError<ErrorName.SCHEDULER_AUTHORIZATION> {
	constructor(value: ErrorMetadataValue[ErrorName.SCHEDULER_AUTHORIZATION]) {
		super({
			error: {
				code: "UNAUTHORIZED",
				message: `"${value.passedPassphrase}" is not the valid passphrase! You don't have permission to use Scheduler.`,
			},
			metadata: {
				name: ErrorName.SCHEDULER_AUTHORIZATION,
				value,
			},
		});
	}
}
