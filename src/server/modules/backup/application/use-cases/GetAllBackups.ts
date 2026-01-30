import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { GetFile } from "@/server/utils/files/application/use-cases/GetFile";
import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { BackupRepository } from "../../domain/repositories/BackupRepository";
import { BackupMapper } from "../../infrastructure/mappers/BackupMapper";
import type { BackupDTO } from "../dto/shared/BackupDTO";

export type GetAllBackupsOptions = {
	skipAuthentication?: boolean;
};

export class GetAllBackups {
	constructor(
		private readonly backupRepository: BackupRepository,
		private readonly getFile: GetFile
	) {}

	async execute(optionsUnsafe?: GetAllBackupsOptions, currentUser?: UserDTO): Promise<BackupDTO[]> {
		const options: GetAllBackupsOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser && !options.skipAuthentication) throw new UnauthorizedError();

		const backups = await this.backupRepository.getAll(async (id) => {
			const fileDTO = await this.getFile.execute({ id: id.value });
			return FileReferenceMapper.fromDTOToEntity(fileDTO);
		});
		return backups.map((backup) => BackupMapper.fromEntityToDTO(backup));
	}
}
