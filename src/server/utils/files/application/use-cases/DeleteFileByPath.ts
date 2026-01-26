import type { UserDTO } from "@/server/utils/identity";
import { UnauthorizedError } from "@/server/utils/identity";
import type { FileManager } from "../../domain/services/FileManager";
import type { FileHelper } from "../helpers/FileHelper";
import type { DeleteFileByPathDTO } from "../dto/DeleteFileByPathDTO";
import { FileMetadataMapper } from "../../infrastructure/mappers/FileMetadataMapper";

export class DeleteFileByPath {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager
	) {}

	async execute(dto: DeleteFileByPathDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const metadata = FileMetadataMapper.fromDTO({
			storageType: this.fileManager.getStorageType(),
			bucket: dto.metadata.bucket,
		});
		const file = await this.fileHelper.getByPathOrThrow(dto.path, metadata);
		await this.fileManager.deleteFile(file);
	}
}
