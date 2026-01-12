import { UploadFileDTO } from "../../application/dto/UploadFileDTO";
import { FileReference } from "../../domain/entities/FileReference";
import { FileManager } from "../../domain/services/FileManager";

export class DefaultFileManager extends FileManager {
	async uploadFile(file: UploadFileDTO) {
		return await this.repository.create({

		});
	}

	async deleteFile(file: FileReference) {
		await this.repository.delete(file);
		await this.storage.deleteFile(file.path);
	}
}
