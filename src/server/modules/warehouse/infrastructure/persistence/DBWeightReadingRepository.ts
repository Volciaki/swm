import type { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import type { ShelfContextGetter } from "../../domain/repositories/TemperatureReadingRepository";
import type { WeightReadingRepository } from "../../domain/repositories/WeightReadingRepository";
import type { WeightReading } from "../../domain/entities/WeightReading";
import { WeightReadingMapper } from "../mappers/WeightReadingMapper";
import type { DBWeightReading } from "../entities/DBWeightReading";

export class DBWeightReadingRepository implements WeightReadingRepository {
	constructor(private readonly db: Repository<DBWeightReading>) {}

	async create(weightReading: WeightReading) {
		const dbObject = WeightReadingMapper.fromEntityToDB(weightReading);
		await this.db.save(dbObject);
	}

	async update(weightReading: WeightReading) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(weightReading);
	}

	async delete(weightReading: WeightReading) {
		const dbObject = await this.db.findOneBy({ id: weightReading.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getById(id: UUID, shelfContextGetter: ShelfContextGetter) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		const shelf = await shelfContextGetter(UUID.fromString(dbObject.shelfId));
		return WeightReadingMapper.fromDBToEntity(dbObject, shelf);
	}

	async getAll(shelfContextGetter: ShelfContextGetter) {
		const dbObjects = await this.db.find();
		const objects = dbObjects.map(async (dbObject) => {
			const dbObjectId = UUID.fromString(dbObject.id);
			return await this.getById(dbObjectId, shelfContextGetter);
		});
		const objectsFetched = await Promise.all(objects);

		return objectsFetched.filter((object) => object !== null);
	}
}
