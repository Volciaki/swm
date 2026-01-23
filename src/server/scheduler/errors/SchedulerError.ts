export class SchedulerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "SchedulerError";
	}
}
