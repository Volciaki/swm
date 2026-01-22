import { environment } from "../environment";
import { NextPhase } from "../environment/type";
import { logger } from "../logger";
import { SchedulerTask } from "./task";
import { getSchedulerTasks } from "./tasks";

// TODO: this doesn't work... it also won't work in serverless environments.
let started = false;

class Scheduler {
	constructor(private readonly tasks: SchedulerTask[]) {}

	private async setupTask(task: SchedulerTask) {
		setInterval(async () => {
			try {
				logger.log(`Running task ${task.getName()}...`);
				await task.execute();
				logger.log(`Task ${task.getName()} has finished!`);
			} catch (error) {
				logger.error(`An error has occurred while running task ${task.getName()}! Details: ${error}.`)
			}
		}, task.getIntervalMilliseconds());
	}

	async start() {
		for (const task of this.tasks) {
			await this.setupTask(task);
		}
	}
}

export const startScheduler = () => {
	// Prevents NextJS from attempting to resolve all the tasks during build time :facepalm:
	if (environment.nextPhase === NextPhase.BUILD) return;
	if (started) return;

	started = true;
	const tasks = getSchedulerTasks();
	const scheduler = new Scheduler(tasks);
	void scheduler.start();
};
