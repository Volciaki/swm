import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { UploadFileDTO } from "../dto/UploadFileDTO";
import { FileManager } from "../../domain/services/FileManager";
import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";

export type UploadShelfOptions = {
	skipAuthentication: boolean;
};

export class UploadFile {
	constructor(private readonly fileManager: FileManager) {}

	async execute(dto: UploadFileDTO, optionsUnsafe?: UploadShelfOptions, currentUser?: UserDTO) {
		const options: UploadShelfOptions = {
			skipAuthentication: false,
			...optionsUnsafe,
		};

		if (!currentUser?.isAdmin && !options.skipAuthentication) throw new UnauthorizedError();

		const fileReference = await this.fileManager.uploadFile(dto);
		return FileReferenceMapper.fromEntityToDTO(fileReference);
	}
}
