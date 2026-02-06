import type { UUID } from "@/server/utils";
import type { WeightReading } from "../entities/WeightReading";
import type { ShelfContextGetter } from "./TemperatureReadingRepository";

export interface WeightReadingRepository {
	create(weightReading: WeightReading): Promise<void>;
	update(weightReading: WeightReading): Promise<void>;
	delete(weightReading: WeightReading): Promise<void>;
	getById(id: UUID, shelfContextGetter: ShelfContextGetter): Promise<WeightReading | null>;
	getAll(shelfContextGetter: ShelfContextGetter): Promise<WeightReading[]>;
}
