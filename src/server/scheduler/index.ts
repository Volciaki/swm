import { environment } from "../environment";
import { logger } from "../logger";
import { SchedulerAuthorizationError } from "./errors/SchedulerAuthorizationError";
import { SchedulerTaskNotFoundError } from "./errors/SchedulerTaskNotFoundError";
import { SchedulerTask } from "./task";
import { getSchedulerTasks } from "./tasks";

class Scheduler {
	constructor(private readonly tasks: SchedulerTask[]) { }

	async runTask(name: string) {
		const task = this.tasks.find((t) => t.getName() === name)

		if (!task) throw new SchedulerTaskNotFoundError(name, this.tasks);

		try {
			logger.log(`Running task ${task.getName()}...`);
			await task.execute();
			logger.log(`Task ${task.getName()} has finished!`);
		} catch (error) {
			logger.error(`An error has occurred while running task ${task.getName()}! Details: ${error}.`)
		}
	}
}

export const getScheduler = async (authenticationPassphrase: string) => {
	if (authenticationPassphrase !== environment.schedule.authentication.passphrase)
		throw new SchedulerAuthorizationError(authenticationPassphrase);

	const tasks = getSchedulerTasks();
	return new Scheduler(tasks);
};
