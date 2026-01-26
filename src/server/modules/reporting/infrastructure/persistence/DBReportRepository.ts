import type { Repository } from "typeorm";
import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import { UUID } from "@/server/utils";
import type { DBReport } from "../entities/DBReport";
import type { ReportRepository } from "../../domain/repositories/ReportRepository";
import { ReportMapper } from "../mappers/ReportMapper";
import type { Report } from "../../domain/entities/Report";

export class DBReportRepository implements ReportRepository {
	constructor(private readonly db: Repository<DBReport>) {}

	async create(report: Report) {
		const dbUser = ReportMapper.fromEntityToDB(report);
		await this.db.save(dbUser);
	}

	async update(report: Report) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(report);
	}

	async delete(report: Report) {
		const dbObject = await this.db.findOneBy({ id: report.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getById(id: UUID, fileContextGetter: FileContextByIDGetter) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		const fileContext = await fileContextGetter(UUID.fromString(dbObject.fileId));
		return ReportMapper.fromDBToEntity(dbObject, fileContext);
	}

	async getAll(fileContextGetter: FileContextByIDGetter) {
		const dbObjects = await this.db.find();
		const objects = dbObjects.map(async (dbObject) => {
			const dbObjectId = UUID.fromString(dbObject.id);
			return await this.getById(dbObjectId, fileContextGetter);
		});
		const objectsFetched = await Promise.all(objects);

		return objectsFetched.filter((object) => object !== null);
	}
}
