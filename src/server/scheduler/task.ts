export interface SchedulerTask {
	getName(): string;
	getIntervalMilliseconds(): number;
	execute(): Promise<void>;
}
