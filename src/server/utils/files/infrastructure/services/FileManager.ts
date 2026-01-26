import { Base64, Base64Mapper } from "@/server/utils/base64";
import type { FileReference } from "../../domain/entities/FileReference";
import type { UploadFileData } from "../../domain/services/FileManager";
import { FileManager } from "../../domain/services/FileManager";
import { FileMetadata } from "../../domain/entities/FileMetadata";

export class DefaultFileManager extends FileManager {
	async uploadFile(file: UploadFileData) {
		const visibility = await this.storage.getVisibility(file.path);
		const fileBuffer = Base64Mapper.toBuffer(Base64.fromString(file.contentBase64));

		let encryptedBuffer;
		if (file.isEncrypted) encryptedBuffer = await this.encryptionManager.encrypt(fileBuffer);

		await this.storage.uploadFile(file.path, encryptedBuffer ?? fileBuffer, file.mimeType);
		return await this.helper.createByDTO(
			file,
			visibility,
			FileMetadata.create(this.storage.getStorageType(), file.metadata.bucket),
			file.predefinedId
		);
	}

	async deleteFile(file: FileReference) {
		await this.repository.delete(file);
		await this.storage.deleteFile(file.path);
	}

	async fetchFile(file: FileReference) {
		const fileBuffer = await this.storage.fetchFile(file.path);

		let decryptedBuffer;
		if (file.isEncrypted) decryptedBuffer = await this.encryptionManager.decrypt(fileBuffer);

		return decryptedBuffer ?? fileBuffer;
	}

	getStorageType() {
		return this.storage.getStorageType();
	}
}
