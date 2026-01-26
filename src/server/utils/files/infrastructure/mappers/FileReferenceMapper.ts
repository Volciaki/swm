import { UUID } from "@/server/utils/uuid";
import type { FileReferenceDTO } from "../../application/dto/shared/FileReferenceDTO";
import { FileReference } from "../../domain/entities/FileReference";
import { VisibilityMapper } from "./VisibilityMapper";
import { DBFileReference } from "../entities/DBFileReference";
import { FileMetadataMapper } from "./FileMetadataMapper";

export class FileReferenceMapper {
	static fromDTOToEntity(dto: FileReferenceDTO): FileReference {
		return FileReference.create(
			UUID.fromString(dto.id),
			dto.sizeBytes,
			dto.mimeType,
			dto.path,
			VisibilityMapper.fromDTO(dto.visibility),
			FileMetadataMapper.fromDTO(dto.metadata),
			dto.isEncrypted
		);
	}

	static fromEntityToDTO(entity: FileReference): FileReferenceDTO {
		const { mimeType, path, sizeBytes, isEncrypted } = entity;
		return {
			visibility: VisibilityMapper.toDTO(entity.visibility),
			metadata: FileMetadataMapper.toDTO(entity.metadata),
			id: entity.id.value,
			mimeType,
			path,
			sizeBytes,
			isEncrypted,
		};
	}

	static fromEntityToDB(entity: FileReference): DBFileReference {
		const dbObject = new DBFileReference();
		const { sizeBytes, path, mimeType, metadata } = entity;

		dbObject.sizeBytes = sizeBytes;
		dbObject.path = path;
		dbObject.mimeType = mimeType;
		dbObject.metadata = FileMetadataMapper.toDTO(metadata);
		dbObject.id = entity.id.value;
		dbObject.isPublic = entity.visibility.isPublic;
		dbObject.publicUrl = entity.visibility.publicUrl ?? null;
		dbObject.isEncrypted = entity.isEncrypted;

		return dbObject;
	}

	static fromDBToEntity(db: DBFileReference): FileReference {
		return FileReference.create(
			UUID.fromString(db.id),
			db.sizeBytes,
			db.mimeType,
			db.path,
			VisibilityMapper.fromDTO({
				publicUrl: db.publicUrl,
				isPublic: db.isPublic,
			}),
			FileMetadataMapper.fromDTO(db.metadata),
			db.isEncrypted
		);
	}
}
