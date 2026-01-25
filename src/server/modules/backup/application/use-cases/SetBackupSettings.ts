import { TimeFrame, UnauthorizedError, UserDTO } from "@/server/utils";
import { BackupSettingsHelper } from "../helpers/BackupSettingsHelper";
import { BackupSettingsMapper } from "../../infrastructure/mappers/BackupSettingsMapper";
import { SetBackupSettingsDTO } from "../dto/SetBackupSettings";
import { BackupSettingsRepository } from "../../domain/repositories/BackupSettingsRepository";

export class SetBackupSettings {
	constructor(
		private readonly backupSettingsHelper: BackupSettingsHelper,
		private readonly backupSettingsRepository: BackupSettingsRepository,
	) {}

	async execute(dto: SetBackupSettingsDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();
		
		const backupSettings = await this.backupSettingsHelper.getOrCreate();

		backupSettings.takeBackupsEvery = TimeFrame.fromSeconds(dto.takeBackupsEverySeconds);

		await this.backupSettingsRepository.update(backupSettings);

		return BackupSettingsMapper.fromEntityToDTO(backupSettings);
	}
}
