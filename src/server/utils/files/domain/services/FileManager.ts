import { UUIDManager } from "@/server/utils/uuid";
import { UploadFileDTO } from "../../application/dto/UploadFileDTO";
import { FileReference } from "../entities/FileReference";
import { FileReferenceRepository } from "./FileReferenceRepository";
import { FileStorage } from "./FileStorage";

// This is meant to act as the glue between implementations of `FileStorage` and `FileReferenceRepository`.
export abstract class FileManager {
	constructor(
		protected readonly storage: FileStorage,
		protected readonly repository: FileReferenceRepository,
		protected readonly uuidManager: UUIDManager,
	) {}

	abstract uploadFile(file: UploadFileDTO): Promise<FileReference>;
	abstract deleteFile(file: FileReference): Promise<void>;
}
