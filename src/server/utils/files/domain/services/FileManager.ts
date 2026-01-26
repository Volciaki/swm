import type { UUID } from "@/server/utils/uuid";
import type { UploadFileDTO } from "../../application/dto/UploadFileDTO";
import type { FileReference } from "../entities/FileReference";
import type { FileReferenceRepository } from "./FileReferenceRepository";
import type { FileStorage, FileStorageType } from "./FileStorage";
import type { FileHelper } from "../../application/helpers/FileHelper";
import type { EncryptionManager } from "./EncryptionManager";

export type UploadFileData = UploadFileDTO & {
	predefinedId?: UUID;
};

// This is meant to act as the glue between implementations of `FileStorage` and `FileReferenceRepository`.
export abstract class FileManager {
	constructor(
		protected readonly storage: FileStorage,
		protected readonly repository: FileReferenceRepository,
		protected readonly helper: FileHelper,
		protected readonly encryptionManager: EncryptionManager
	) {}

	abstract uploadFile(file: UploadFileData): Promise<FileReference>;
	abstract deleteFile(file: FileReference): Promise<void>;
	abstract fetchFile(file: FileReference): Promise<Buffer>;
	abstract getStorageType(): FileStorageType;
}
