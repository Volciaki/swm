import { UnauthorizedError, UserDTO } from "@/server/utils";
import { TakeBackupResponseDTO } from "../dto/TakeBackupResponseDTO";
import { BackupHelper } from "../helpers/BackupHelper";
import { BackupMapper } from "../../infrastructure/mappers/BackupMapper";

export type TakeBackupOptions = {
	skipAuthentication: boolean;
};

export class TakeBackup {
	constructor(private readonly backupHelper: BackupHelper) {}

	async execute(optionsUnsafe?: TakeBackupOptions, currentUser?: UserDTO): Promise<TakeBackupResponseDTO> {
		const options: TakeBackupOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const backup = await this.backupHelper.take();
		return BackupMapper.fromEntityToDTO(backup);
	}
}
