import { SchedulerError } from "./SchedulerError";

export class SchedulerAuthorizationError extends SchedulerError {
	constructor(passedPassphrase: string) {
		super(`"${passedPassphrase}" is not the valid passphrase! You don't have permission to use Scheduler.`);
	}
}
