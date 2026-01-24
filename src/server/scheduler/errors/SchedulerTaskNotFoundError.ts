import { SchedulerTask } from "../task";
import { SchedulerError } from "./SchedulerError";

export class SchedulerTaskNotFoundError extends SchedulerError {
	constructor(name: string, tasks: SchedulerTask[]) {
		super(`There's no Scheduler task with name "${name}"! Available ones are: ${tasks.map((task) => task.getName())}.`);
	}
}
