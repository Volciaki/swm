import { UtilsError } from "@/server/utils/errors";

export class FilesApplicationError extends UtilsError {
	constructor(message: string) {
		super(message);
		this.name = "FilesApplicationError";
	}
}
