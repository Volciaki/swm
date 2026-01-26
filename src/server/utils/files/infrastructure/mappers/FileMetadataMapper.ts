import type { FileMetadataDTO } from "../../application/dto/shared/FileMetadataDTO";
import { FileMetadata } from "../../domain/entities/FileMetadata";

export class FileMetadataMapper {
	static fromDTO(dto: FileMetadataDTO): FileMetadata {
		return FileMetadata.create(dto.storageType, dto.bucket);
	}

	static toDTO(entity: FileMetadata): FileMetadataDTO {
		return {
			storageType: entity.storageType,
			bucket: entity.bucket,
		};
	}
}
