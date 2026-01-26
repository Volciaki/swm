import type { UserDTO } from "@/server/utils";
import { TimeFrame, UnauthorizedError } from "@/server/utils";
import type { BackupSettingsHelper } from "../helpers/BackupSettingsHelper";
import { BackupSettingsMapper } from "../../infrastructure/mappers/BackupSettingsMapper";
import type { SetBackupSettingsDTO } from "../dto/SetBackupSettings";
import type { BackupSettingsRepository } from "../../domain/repositories/BackupSettingsRepository";

export class SetBackupSettings {
	constructor(
		private readonly backupSettingsHelper: BackupSettingsHelper,
		private readonly backupSettingsRepository: BackupSettingsRepository
	) {}

	async execute(dto: SetBackupSettingsDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const backupSettings = await this.backupSettingsHelper.getOrCreate();

		backupSettings.takeBackupsEvery = TimeFrame.fromSeconds(dto.takeBackupsEverySeconds);

		await this.backupSettingsRepository.update(backupSettings);

		return BackupSettingsMapper.fromEntityToDTO(backupSettings);
	}
}
