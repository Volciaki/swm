import { Weight } from "@/server/utils";
import type { Shelf } from "../../domain/entities/Shelf";
import type { ShelfScale } from "../../domain/services/ShelfScale";

export class ConstantShelfScale implements ShelfScale {
	async getInitialWeightForShelf(shelf: Shelf): Promise<Weight | null> {
		return Weight.fromGrams(0);
	}

	async getWeightForShelf(shelf: Shelf) {
		// In our case there's no point in changing Shelf weight here.
		// `lastRecordedLegalWeight` is set to the new weight of all assortments after each update of the Shelf.
		// This is de facto as accurate as we can get without actual physical, real life, scales, so I assume that
		// it will be fine to just leave it as is. If we were to connect this to a scale, we'd just need to communicate
		// with it here, and everything else would remain working fine.
		return shelf.lastRecordedLegalWeight;
	}
}
