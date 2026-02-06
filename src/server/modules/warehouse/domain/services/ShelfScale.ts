import type { Weight } from "@/server/utils";
import type { Shelf } from "../entities/Shelf";

export interface ShelfScale {
	getWeightForShelf(shelf: Shelf): Promise<Weight>;
	// If you don't want to implement this, just return `null`. The above method will then be used at all times, including the start.
	getInitialWeightForShelf(shelf: Shelf): Promise<Weight | null>;
}
