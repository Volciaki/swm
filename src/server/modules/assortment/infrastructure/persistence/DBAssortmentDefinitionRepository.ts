import type { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { DBAssortmentDefinition } from "../entities/DBAssortmentDefinition";
import type { AssortmentDefinitionRepository } from "../../domain/repositories/AssortmentDefinitionRepository";
import { AssortmentDefinitionMapper } from "../mappers/AssortmentDefinitionMapper";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";

export class DBAssortmentDefinitionRepository implements AssortmentDefinitionRepository {
	constructor(private readonly db: Repository<DBAssortmentDefinition>) {}

	async create(definition: AssortmentDefinition) {
		const dbObject = AssortmentDefinitionMapper.fromEntityToDB(definition);
		await this.db.save(dbObject);
	}

	async update(definition: AssortmentDefinition) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(definition);
	}

	async delete(definition: AssortmentDefinition) {
		const dbObject = await this.db.findOneBy({ id: definition.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getById(id: UUID, getFileContextById: FileContextByIDGetter) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		return AssortmentDefinitionMapper.fromDBToEntity(
			dbObject,
			await getFileContextById(UUID.fromString(dbObject.qrCodeFileReferenceId)),
			dbObject.imageFileReferenceId === null
				? null
				: await getFileContextById(UUID.fromString(dbObject.imageFileReferenceId))
		);
	}

	async getAll(getFileContextById: FileContextByIDGetter) {
		const dbObjects = await this.db.find();
		const objects = dbObjects.map(async (db) => {
			const dbAssortmentId = UUID.fromString(db.id);
			return await this.getById(dbAssortmentId, getFileContextById);
		});
		const objectsFetched = await Promise.all(objects);

		return objectsFetched.filter((object) => object !== null);
	}
}
