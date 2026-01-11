import { UtilsError } from "@/server/utils/error";

export class FilesDomainError extends UtilsError {
	constructor(message: string) {
		super(message);
		this.name = "FilesDomainError";
	}
}
