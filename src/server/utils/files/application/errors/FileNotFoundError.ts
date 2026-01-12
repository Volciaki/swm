import { UUID } from "@/server/utils/uuid";
import { FilesApplicationError } from "./FilesApplicationError";

export class FileNotFoundError extends FilesApplicationError {
	constructor(id: UUID) {
		super(`File with an id of ${id.value} doesn't exist!`);
	}
}
