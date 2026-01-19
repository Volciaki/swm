export class MonitoringDomainError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MonitoringDomainError";
	}
}
