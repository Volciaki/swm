import { Repository } from "typeorm";
import { BackupSettings } from "../../domain/entities/BackupSettings";
import { BackupSettingsRepository } from "../../domain/repositories/BackupSettingsRepository";
import { DBBackupSettings } from "../entities/DBBackupSettings";
import { BackupSettingsMapper } from "../mappers/BackupSettingsMapper";

export class DBBackupSettingsRepository implements BackupSettingsRepository {
	constructor(private readonly db: Repository<DBBackupSettings>) { }

	async create(backupSettings: BackupSettings) {
		const dbObject = BackupSettingsMapper.fromEntityToDB(backupSettings);
		await this.db.save(dbObject);
	}

	async update(backupSettings: BackupSettings) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(backupSettings);
	}

	async get() {
		const dbObjects = await this.db.find();
		const dbObject = dbObjects[0];

		if (!dbObject) return null;

		return BackupSettingsMapper.fromDBToEntity(dbObject)
	}
}
