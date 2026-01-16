import { Base64, Base64Mapper } from "@/server/utils/base64";
import { UploadFileDTO } from "../../application/dto/UploadFileDTO";
import { FileReference } from "../../domain/entities/FileReference";
import { FileManager } from "../../domain/services/FileManager";
import { FileMetadata } from "../../domain/entities/FileMetadata";

export class DefaultFileManager extends FileManager {
	async uploadFile(file: UploadFileDTO) {
		const visibility = await this.storage.getVisibility(file.path);
		const fileBuffer = Base64Mapper.toBuffer(Base64.fromString(file.contentBase64));

		await this.storage.uploadFile(file.path, fileBuffer, file.mimeType);
		return await this.helper.createByDTO(
			file,
			visibility,
			FileMetadata.create(
				this.storage.getStorageType(),
				file.metadata.bucket,
			),
		);
	}

	async deleteFile(file: FileReference) {
		await this.repository.delete(file);
		await this.storage.deleteFile(file.path);
	}

	async fetchFile(file: FileReference) {
		return await this.storage.fetchFile(file.path);
	}

	getStorageType() {
		return this.storage.getStorageType();
	}
}
