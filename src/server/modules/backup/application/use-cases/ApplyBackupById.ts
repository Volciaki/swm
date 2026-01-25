import { UnauthorizedError, UserDTO } from "@/server/utils";
import { BackupHelper } from "../helpers/BackupHelper";
import { ApplyBackupByIdDTO } from "../dto/ApplyBackupByIdDTO";

export class ApplyBackupById {
	constructor(private readonly backupHelper: BackupHelper) {}

	async execute(dto: ApplyBackupByIdDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const backup = await this.backupHelper.getByIdStringOrThrow(dto.id);
		await this.backupHelper.apply(backup);
	}
}
