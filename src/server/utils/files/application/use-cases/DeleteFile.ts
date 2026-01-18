import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { FileManager } from "../../domain/services/FileManager";
import { DeleteFileDTO } from "../dto/DeleteFile";
import { FileHelper } from "../helpers/FileHelper";

export class DeleteFile {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager,
	) {}

	async execute(dto: DeleteFileDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		await this.fileManager.deleteFile(file);
	}
}
