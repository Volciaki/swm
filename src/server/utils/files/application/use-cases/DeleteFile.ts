import type { UserDTO } from "@/server/utils/identity";
import { UnauthorizedError } from "@/server/utils/identity";
import type { FileManager } from "../../domain/services/FileManager";
import type { DeleteFileDTO } from "../dto/DeleteFile";
import type { FileHelper } from "../helpers/FileHelper";

export type DeleteFileOptions = {
	skipAuthentication: boolean;
};

export class DeleteFile {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly fileManager: FileManager
	) {}

	async execute(dto: DeleteFileDTO, optionsUnsafe?: DeleteFileOptions, currentUser?: UserDTO) {
		const options: DeleteFileOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const file = await this.fileHelper.getByIdStringOrThrow(dto.id);
		await this.fileManager.deleteFile(file);
	}
}
