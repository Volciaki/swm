import { UploadFileDTO } from "../../application/dto/UploadFileDTO";
import { FileReference } from "../entities/FileReference";
import { FileReferenceRepository } from "./FileReferenceRepository";
import { FileStorage, FileStorageType } from "./FileStorage";
import { FileHelper } from "../../application/helpers/FileHelper";

// This is meant to act as the glue between implementations of `FileStorage` and `FileReferenceRepository`.
export abstract class FileManager {
	constructor(
		protected readonly storage: FileStorage,
		protected readonly repository: FileReferenceRepository,
		protected readonly helper: FileHelper,
	) {}

	abstract uploadFile(file: UploadFileDTO): Promise<FileReference>;
	abstract deleteFile(file: FileReference): Promise<void>;
	abstract fetchFile(file: FileReference): Promise<Buffer>;
	abstract getStorageType(): FileStorageType;
}
