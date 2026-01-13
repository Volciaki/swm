import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { UploadFileDTO } from "../dto/UploadFileDTO";
import { FileManager } from "../../domain/services/FileManager";
import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";

export class UploadFile {
	constructor(private readonly fileManager: FileManager) {}

	async execute(dto: UploadFileDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const fileReference = await this.fileManager.uploadFile(dto);
		return FileReferenceMapper.fromEntityToDTO(fileReference);
	}
}
