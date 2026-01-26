import type { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { BackupRepository } from "../../domain/repositories/BackupRepository";
import type { DBBackup } from "../entities/DBBackup";
import type { Backup } from "../../domain/entities/Backup";
import { BackupMapper } from "../mappers/BackupMapper";

export class DBBackupRepository implements BackupRepository {
	constructor(private readonly db: Repository<DBBackup>) {}

	async create(backup: Backup) {
		const dbObject = BackupMapper.fromEntityToDB(backup);
		await this.db.save(dbObject);
	}

	async update(backup: Backup) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(backup);
	}

	async delete(backup: Backup) {
		const dbObject = await this.db.findOneBy({ id: backup.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getById(id: UUID, getFileContextById: FileContextByIDGetter) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		return BackupMapper.fromDBToEntity(dbObject, await getFileContextById(UUID.fromString(dbObject.fileId)));
	}

	async getAll(getFileContextById: FileContextByIDGetter) {
		const dbObjects = await this.db.find();
		const objects = dbObjects.map(async (dbObject) => {
			const dbObjectId = UUID.fromString(dbObject.id);
			return await this.getById(dbObjectId, getFileContextById);
		});
		const objectsFetched = await Promise.all(objects);

		return objectsFetched.filter((object) => object !== null);
	}
}
