import { UtilsError } from "@/server/utils/errors";

export class FilesDomainError extends UtilsError {
	constructor(message: string) {
		super(message);
		this.name = "FilesDomainError";
	}
}
