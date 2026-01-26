import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { UUID } from "@/server/utils";
import type { BackupDTO } from "../../application/dto/shared/BackupDTO";
import { Backup } from "../../domain/entities/Backup";
import { DBBackup } from "../entities/DBBackup";

export class BackupMapper {
	static fromDTOToEntity(dto: BackupDTO): Backup {
		const { id, dateTimestamp, file } = dto;
		return Backup.create(UUID.fromString(id), new Date(dateTimestamp), FileReferenceMapper.fromDTOToEntity(file));
	}

	static fromEntityToDTO(entity: Backup): BackupDTO {
		const { id, date, file } = entity;
		return {
			id: id.value,
			file: FileReferenceMapper.fromEntityToDTO(file),
			dateTimestamp: date.getTime(),
		};
	}

	static fromDBToEntity(db: DBBackup, file: FileReference): Backup {
		const { id, date } = db;
		return Backup.create(UUID.fromString(id), date, file);
	}

	static fromEntityToDB(entity: Backup): DBBackup {
		const dbObject = new DBBackup();

		dbObject.id = entity.id.value;
		dbObject.date = entity.date;
		dbObject.fileId = entity.file.id.value;

		return dbObject;
	}
}
