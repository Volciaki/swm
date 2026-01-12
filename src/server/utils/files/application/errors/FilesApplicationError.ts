import { UtilsError } from "@/server/utils/error";

export class FilesApplicationError extends UtilsError {
	constructor(message: string) {
		super(message);
		this.name = "FilesApplicationError";
	}
}
