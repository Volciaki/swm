import { UnauthorizedError, UserDTO } from "@/server/utils";
import { BackupSettingsHelper } from "../helpers/BackupSettingsHelper";
import { BackupSettingsMapper } from "../../infrastructure/mappers/BackupSettingsMapper";

export type GetBackupSettingsOptions = {
	skipAuthentication?: boolean;
};

export class GetBackupSettings {
	constructor(private readonly backupSettingsHelper: BackupSettingsHelper) {}

	async execute(optionsUnsafe?: GetBackupSettingsOptions, currentUser?: UserDTO) {
		const options: GetBackupSettingsOptions = {
			skipAuthentication: true,
			...optionsUnsafe,
		};

		if (!currentUser && !options.skipAuthentication) throw new UnauthorizedError();
		
		const backupSettings = await this.backupSettingsHelper.getOrCreate();
		return BackupSettingsMapper.fromEntityToDTO(backupSettings);
	}
}
