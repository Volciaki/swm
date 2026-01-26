import type { UUIDManager } from "@/server/utils/uuid";
import { UUID } from "@/server/utils/uuid";
import { Base64, Base64Mapper } from "@/server/utils/base64";
import type { FileReference } from "../../domain/entities/FileReference";
import type { FileReferenceRepository } from "../../domain/services/FileReferenceRepository";
import type { UploadFileDTO } from "../dto/UploadFileDTO";
import { FileReferenceMapper } from "../../infrastructure/mappers/FileReferenceMapper";
import type { Visibility } from "../../domain/entities/Visibility";
import { VisibilityMapper } from "../../infrastructure/mappers/VisibilityMapper";
import { FileNotFoundError } from "../errors/FileNotFoundError";
import type { FileMetadata } from "../../domain/entities/FileMetadata";
import { FileMetadataMapper } from "../../infrastructure/mappers/FileMetadataMapper";

const getSizeBytesByBase64String = (content: string): number => {
	const base64 = Base64.fromString(content);
	const buffer = Base64Mapper.toBuffer(base64);
	return buffer.length;
};

export interface FileHelper {
	getByIdStringOrThrow(id: string): Promise<FileReference>;
	getByPathOrThrow(path: string, metadata: FileMetadata): Promise<FileReference>;
	createByDTO(
		dto: UploadFileDTO,
		visibility: Visibility,
		metadata: FileMetadata,
		predefinedId?: UUID
	): Promise<FileReference>;
}

export class DefaultFileHelper implements FileHelper {
	constructor(
		private readonly fileReferenceRepository: FileReferenceRepository,
		private readonly uuidManager: UUIDManager
	) {}

	async getByIdStringOrThrow(idString: string) {
		const id = UUID.fromString(idString);
		const entity = await this.fileReferenceRepository.getById(id);

		if (entity === null) throw new FileNotFoundError("ID", id.value);

		return entity;
	}

	async getByPathOrThrow(path: string, metadata: FileMetadata) {
		const entity = await this.fileReferenceRepository.getByPath(path, metadata);

		if (entity === null) throw new FileNotFoundError("path", path);

		return entity;
	}

	async createByDTO(dto: UploadFileDTO, visibility: Visibility, metadata: FileMetadata, predefinedId?: UUID) {
		const sizeBytes = getSizeBytesByBase64String(dto.contentBase64);
		const fileReference = FileReferenceMapper.fromDTOToEntity({
			...dto,
			id: predefinedId?.value ?? this.uuidManager.generate().value,
			sizeBytes: sizeBytes,
			visibility: VisibilityMapper.toDTO(visibility),
			metadata: FileMetadataMapper.toDTO(metadata),
		});
		await this.fileReferenceRepository.create(fileReference);
		return fileReference;
	}
}
