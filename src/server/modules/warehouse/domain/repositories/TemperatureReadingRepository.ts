import type { UUID } from "@/server/utils";
import type { TemperatureReading } from "../entities/TemperatureReading";
import type { Shelf } from "../entities/Shelf";

export type ShelfContextGetter = (shelfId: UUID) => Promise<Shelf>;

export interface TemperatureReadingRepository {
	create(temperatureReading: TemperatureReading): Promise<void>;
	update(temperatureReading: TemperatureReading): Promise<void>;
	delete(temperatureReading: TemperatureReading): Promise<void>;
	getById(id: UUID, shelfContextGetter: ShelfContextGetter): Promise<TemperatureReading | null>;
	getAll(shelfContextGetter: ShelfContextGetter): Promise<TemperatureReading[]>;
}
