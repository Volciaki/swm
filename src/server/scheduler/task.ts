export interface SchedulerTask {
	getName(): string;
	execute(): Promise<void>;
}
