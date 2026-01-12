import { UserDTO, UnauthorizedError } from "@/server/utils/identity";
import { UploadFileDTO } from "../dto/UploadFileDTO";
import { FileManager } from "../../domain/services/FileManager";

export class UploadFile {
	constructor(private readonly fileManager: FileManager) {}

	async execute(dto: UploadFileDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();
		await this.fileManager.uploadFile(dto);
	}
}
