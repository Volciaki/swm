import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { BackupHelper } from "../helpers/BackupHelper";
import type { ApplyBackupByIdDTO } from "../dto/ApplyBackupByIdDTO";

export class ApplyBackupById {
	constructor(private readonly backupHelper: BackupHelper) {}

	async execute(dto: ApplyBackupByIdDTO, currentUser?: UserDTO) {
		if (!currentUser) throw new UnauthorizedError();

		const backup = await this.backupHelper.getByIdStringOrThrow(dto.id);
		await this.backupHelper.apply(backup);
	}
}
