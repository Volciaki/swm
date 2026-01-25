import { UnauthorizedError, UserDTO } from "@/server/utils";
import { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { BackupRepository } from "../../domain/repositories/BackupRepository";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import { BackupMapper } from "../../infrastructure/mappers/BackupMapper";

export type GetAllBackupsOptions = {
	skipAuthentication?: boolean;
};

export class GetAllBackups {
	constructor(
		private readonly backupRepository: BackupRepository,
		private readonly getFile: GetFile,
	) {}

	async execute(optionsUnsafe?: GetAllBackupsOptions, currentUser?: UserDTO) {
		const options: GetAllBackupsOptions = {
			skipAuthentication: true,
			...optionsUnsafe,
		};

		if (!currentUser && !options.skipAuthentication) throw new UnauthorizedError();
		
		const backups = await this.backupRepository.getAll(
			async (id) => {
				const fileDTO = await this.getFile.execute({ id: id.value });
				return FileReferenceMapper.fromDTOToEntity(fileDTO);
			},
		);
		return backups.map((backup) => BackupMapper.fromEntityToDTO(backup)); 
	}
}
