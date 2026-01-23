import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { DBAssortment } from "../entities/DBAssortment";
import { Assortment } from "../../domain/entities/Assortment";
import { AssortmentMapper } from "../mappers/AssortmentMapper";

export class DBAssortmentRepository implements AssortmentRepository {
	constructor(private readonly db: Repository<DBAssortment>) { }

	async create(assortment: Assortment) {
		const dbAssortment = AssortmentMapper.fromAssortmentToDBAssortment(assortment);
		await this.db.save(dbAssortment);
	}

	async update(assortment: Assortment) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(assortment);
	}

	async delete(assortment: Assortment) {
		const dbAssortment = await this.db.findOneBy({ id: assortment.id.value });

		if (dbAssortment === null) return;

		await this.db.remove(dbAssortment);
	}

	async getById(id: UUID, getFileContextById: FileContextByIDGetter) {
		const dbAssortment = await this.db.findOneBy({ id: id.value });

		if (dbAssortment === null) return null;

		return AssortmentMapper.fromDBAssortmentToAssortment(
			dbAssortment,
			await getFileContextById(UUID.fromString(dbAssortment.qrCodeFileReferenceId)),
			dbAssortment.imageFileReferenceId === null
				? null
				: await getFileContextById(UUID.fromString(dbAssortment.imageFileReferenceId)),
		);
	}

	async getAll(getFileContextById: FileContextByIDGetter) {
		const dbAssortments = await this.db.find();
		const assortments = dbAssortments.map(async (dbAssortment) => {
			const dbAssortmentId = UUID.fromString(dbAssortment.id);
			return await this.getById(dbAssortmentId, getFileContextById);
		});
		const assortmentsFetched = await Promise.all(assortments);

		return assortmentsFetched.filter((assortment) => assortment !== null);
	}
}
