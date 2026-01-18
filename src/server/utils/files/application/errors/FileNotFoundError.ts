import { FilesApplicationError } from "./FilesApplicationError";

export class FileNotFoundError extends FilesApplicationError {
	constructor(field: "ID" | "path", value: string) {
		super(`File with a ${field} of ${value} doesn't exist!`);
	}
}
