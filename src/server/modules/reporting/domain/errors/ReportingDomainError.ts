export class ReportingDomainError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ReportingDomainError";
	}
}
