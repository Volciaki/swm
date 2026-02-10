import { Base64, Base64Mapper } from "@/server/utils/base64";
import type { FileReference } from "../../domain/entities/FileReference";
import type { CreateFileReferenceData, UploadFileData } from "../../domain/services/FileManager";
import { FileManager } from "../../domain/services/FileManager";
import { FileMetadata } from "../../domain/entities/FileMetadata";

export class DefaultFileManager extends FileManager {
	private async fetchFileInternal({ path, isEncrypted }: { path: string; isEncrypted: boolean }) {
		const fileBuffer = await this.storage.fetchFile(path);

		let decryptedBuffer;
		if (isEncrypted) decryptedBuffer = await this.encryptionManager.decrypt(fileBuffer);

		return decryptedBuffer ?? fileBuffer;
	}

	// Use this for recreating missing references. If you want to upload a new file instead (with its data) use `uploadFile`.
	async createReference(reference: CreateFileReferenceData) {
		const visibility = await this.storage.getVisibility(reference.path);
		const fileBuffer = await this.fetchFileInternal(reference);
		const fileBase64 = Base64Mapper.fromBuffer(fileBuffer);

		const createDTO = { ...reference, contentBase64: fileBase64.value };

		return await this.helper.createByDTO(
			createDTO,
			visibility,
			FileMetadata.create(this.storage.getStorageType(), reference.metadata.bucket),
			reference.predefinedId
		);
	}

	async uploadFile(file: UploadFileData) {
		const fileBuffer = Base64Mapper.toBuffer(Base64.fromString(file.contentBase64));

		let encryptedBuffer;
		if (file.isEncrypted) encryptedBuffer = await this.encryptionManager.encrypt(fileBuffer);

		await this.storage.uploadFile(file.path, encryptedBuffer ?? fileBuffer, file.mimeType);
		return await this.createReference(file);
	}

	async deleteFile(file: FileReference) {
		await this.repository.delete(file);
		await this.storage.deleteFile(file.path);
	}

	async fetchFile(file: FileReference) {
		return await this.fetchFileInternal(file);
	}

	getStorageType() {
		return this.storage.getStorageType();
	}
}
