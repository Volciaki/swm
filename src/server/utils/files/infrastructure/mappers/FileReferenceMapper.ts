import { UUID } from "@/server/utils/uuid";
import { FileReferenceDTO } from "../../domain/dto/FileReferenceDTO";
import { FileReference } from "../../domain/entities/FileReference";
import { VisibilityMapper } from "./VisibilityMapper";
import { DBFileReference } from "../entities/DBFileReference";

export class FileReferenceMapper {
	static fromDTOToEntity(dto: FileReferenceDTO): FileReference {
		return FileReference.create(
		 	UUID.fromString(dto.id),
			dto.sizeBytes,
			dto.mimeType,
			dto.path,
			VisibilityMapper.fromDTO(dto.visibility),
		);
	}

	static fromEntityToDTO(entity: FileReference): FileReferenceDTO {
		const { mimeType, path, sizeBytes  } = entity;
		return {
			visibility: VisibilityMapper.toDTO(entity.visibility),
			id: entity.id.value,
			mimeType,
			path,
			sizeBytes,
		};
	}

	static fromEntityToDB(entity: FileReference): DBFileReference {
		const dbObject = new DBFileReference();
		const { sizeBytes, path, mimeType } = entity;

		dbObject.sizeBytes = sizeBytes;
		dbObject.path = path;
		dbObject.mimeType = mimeType;
		dbObject.id = entity.id.value;
		dbObject.isPublic = entity.visibility.isPublic;
		dbObject.publicUrl = entity.visibility.publicUrl ?? null;

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
		);
	}
}
