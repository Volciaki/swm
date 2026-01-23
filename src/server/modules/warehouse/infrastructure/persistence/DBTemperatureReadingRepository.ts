import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { ShelfContextGetter, TemperatureReadingRepository } from "../../domain/repositories/TemperatureReadingRepository";
import { TemperatureReadingMapper } from "../mappers/TemperatureReadingMapper";
import { TemperatureReading } from "../../domain/entities/TemperatureReading";
import { DBTemperatureReading } from "../entities/DBTemperatureReading";

export class DBTemperatureReadingRepository implements TemperatureReadingRepository {
	constructor(private readonly db: Repository<DBTemperatureReading>) {}

	async create(temperatureReading: TemperatureReading) {
		const dbObject = TemperatureReadingMapper.fromEntityToDB(temperatureReading);
		await this.db.save(dbObject);
	}

	async update(temperatureReading: TemperatureReading) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(temperatureReading);
	}

	async delete(temperatureReading: TemperatureReading) {
		const dbObject = await this.db.findOneBy({ id: temperatureReading.id.value });

		if (dbObject === null) return;

		await this.db.remove(dbObject);
	}

	async getById(id: UUID, shelfContextGetter: ShelfContextGetter) {
		const dbObject = await this.db.findOneBy({ id: id.value });

		if (dbObject === null) return null;

		const shelf = await shelfContextGetter(UUID.fromString(dbObject.shelfId));
		return TemperatureReadingMapper.fromDBToEntity(dbObject, shelf);
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
