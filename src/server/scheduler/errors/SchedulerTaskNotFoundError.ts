import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { SchedulerError } from "./SchedulerError";

export class SchedulerTaskNotFoundError extends SchedulerError<ErrorName.SCHEDULER_TASK_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.SCHEDULER_TASK_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `There's no Scheduler task with name "${value.name}"! Available ones are: ${value.availableTasks}.`,
			},
			metadata: {
				name: ErrorName.SCHEDULER_TASK_NOT_FOUND,
				value,
			},
		});
	}
}
