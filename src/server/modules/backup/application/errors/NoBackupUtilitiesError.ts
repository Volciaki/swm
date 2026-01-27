import type { UUID } from "@/server/utils";
import { BackupApplicationError } from "./BackupApplicationError";

export class BackupNotFoundError extends BackupApplicationError {
	constructor(id: UUID) {
		super(`Couldn't find a Backup with an ID set to ${id.value}`);
	}
}
