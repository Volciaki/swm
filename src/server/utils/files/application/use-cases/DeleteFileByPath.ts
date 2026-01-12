import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { FileManager } from "../../domain/services/FileManager";
import { FileHelper } from "../helpers/FileHelper";
import { DeleteFileByPathDTO } from "../dto/DeleteFileByPathDTO";

export class DeleteFileByPath {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager,
	) {}

	async execute(dto: DeleteFileByPathDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const file = await this.fileHelper.getByPathOrThrow(dto.path);
		await this.fileManager.deleteFile(file);
	}
}
