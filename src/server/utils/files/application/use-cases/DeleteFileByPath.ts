import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { FileManager } from "../../domain/services/FileManager";
import { FileHelper } from "../helpers/FileHelper";
import { DeleteFileByPathDTO } from "../dto/DeleteFileByPathDTO";
import { FileMetadataMapper } from "../../infrastructure/mappers/FileMetadataMapper";

export class DeleteFileByPath {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager,
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
