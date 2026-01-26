import type { UUID } from "@/server/utils/uuid";
import type { UserDTO } from "@/server/utils/identity";
import { UnauthorizedError } from "@/server/utils/identity";
import type { UploadFileDTO } from "../dto/UploadFileDTO";
import type { FileManager } from "../../domain/services/FileManager";
import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";

export type UploadFileOptions = {
	skipAuthentication?: boolean;
	predefinedId?: UUID;
};

export class UploadFile {
	constructor(private readonly fileManager: FileManager) {}

	async execute(dto: UploadFileDTO, optionsUnsafe?: UploadFileOptions, currentUser?: UserDTO) {
		const options: UploadFileOptions = {
			skipAuthentication: false,
			predefinedId: undefined,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const fileReference = await this.fileManager.uploadFile({
			...dto,
			predefinedId: options.predefinedId,
		});
		return FileReferenceMapper.fromEntityToDTO(fileReference);
	}
}
