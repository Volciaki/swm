import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { FileReferenceRepository } from "../../domain/services/FileReferenceRepository";
import { DBFileReference } from "../entities/DBFileReference";
import { FileReferenceMapper } from "../mappers/FileReferenceMapper";
import { FileReference } from "../../domain/entities/FileReference";

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
		const objects = dbObjects.map(
			(object) => FileReferenceMapper.fromDBToEntity(object)
		);
		return objects;
	}

	async getById(id: UUID) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		return FileReferenceMapper.fromDBToEntity(dbObject);
	}

	async getByPath(path: string) {
		const dbObject = await this.db.findOneBy({ path });

		if (dbObject === null) return null;

		return FileReferenceMapper.fromDBToEntity(dbObject);
	}
}
