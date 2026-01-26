import type { Repository } from "typeorm";
import type { UUID } from "@/server/utils";
import type { FileReferenceRepository } from "../../domain/services/FileReferenceRepository";
import type { DBFileReference } from "../entities/DBFileReference";
import { FileReferenceMapper } from "../mappers/FileReferenceMapper";
import type { FileReference } from "../../domain/entities/FileReference";
import type { FileMetadata } from "../../domain/entities/FileMetadata";
import { FileStorageType } from "../../domain/services/FileStorage";

export class DBFileReferenceRepository implements FileReferenceRepository {
	constructor(private readonly db: Repository<DBFileReference>) {}

	async create(fileReference: FileReference) {
		const dbObject = FileReferenceMapper.fromEntityToDB(fileReference);
		const saved = await this.db.save(dbObject);
		return FileReferenceMapper.fromDBToEntity(saved);
	}

	async update(fileReference: FileReference) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(fileReference);
	}

	async delete(fileReference: FileReference) {
		const dbObject = await this.db.findOneBy({ id: fileReference.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getAll() {
		const dbObjects = await this.db.find();
		const objects = dbObjects.map((object) => FileReferenceMapper.fromDBToEntity(object));
		return objects;
	}

	async getById(id: UUID) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		return FileReferenceMapper.fromDBToEntity(dbObject);
	}

	async getByPath(path: string, metadata: FileMetadata) {
		let dbObject;

		const matchingPaths = await this.db.find({ where: { path } });
		const bucket = metadata.storageType === FileStorageType.S3 ? metadata.bucket : null;
		if (bucket === null) {
			dbObject = matchingPaths[0];
		} else {
			dbObject = matchingPaths.find((object) => object.metadata.bucket === bucket);
		}

		if (dbObject === null || dbObject === undefined) return null;

		return FileReferenceMapper.fromDBToEntity(dbObject);
	}
}
