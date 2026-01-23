import { CelsiusDegrees } from "@/server/utils";
import { Shelf } from "../entities/Shelf";

export interface ShelfThermometer {
	getTemperatureForShelf(shelf: Shelf): Promise<CelsiusDegrees>;
	// If you don't want to implement this, just return `null`. The above method will then be used at all times, including the start.
	getInitialTemperatureForShelf(shelf: Shelf): Promise<CelsiusDegrees | null>;
}
