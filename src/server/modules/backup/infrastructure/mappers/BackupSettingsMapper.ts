import { TimeFrame, UUID } from "@/server/utils";
import type { BackupSettingsDTO } from "../../application/dto/shared/BackupSettingsDTO";
import { BackupSettings } from "../../domain/entities/BackupSettings";
import { DBBackupSettings } from "../entities/DBBackupSettings";

export class BackupSettingsMapper {
	static fromDTOToEntity(dto: BackupSettingsDTO): BackupSettings {
		const { id, takeBackupsEverySeconds } = dto;
		return BackupSettings.create(UUID.fromString(id), TimeFrame.fromSeconds(takeBackupsEverySeconds));
	}

	static fromEntityToDTO(entity: BackupSettings): BackupSettingsDTO {
		const { id, takeBackupsEvery } = entity;
		return {
			id: id.value,
			takeBackupsEverySeconds: takeBackupsEvery.seconds.value,
		};
	}

	static fromDBToEntity(db: DBBackupSettings): BackupSettings {
		const { id, takeBackupsEverySeconds } = db;
		return BackupSettings.create(UUID.fromString(id), TimeFrame.fromSeconds(takeBackupsEverySeconds));
	}

	static fromEntityToDB(entity: BackupSettings): DBBackupSettings {
		const dbObject = new DBBackupSettings();

		dbObject.id = entity.id.value;
		dbObject.takeBackupsEverySeconds = entity.takeBackupsEvery.seconds.value;

		return dbObject;
	}
}
