import { CelsiusDegrees, average, clampNumberToMinMax, randomInclusiveFloat } from "@/server/utils";
import type { ShelfThermometer } from "../../domain/services/ShelfThermometer";
import type { Shelf } from "../../domain/entities/Shelf";

export class RandomShelfThermometer implements ShelfThermometer {
	async getInitialTemperatureForShelf(shelf: Shelf) {
		const averageShelfTemperature = average([
			shelf.temperatureRange.minimal.value,
			shelf.temperatureRange.maximal.value,
		]);

		return CelsiusDegrees.fromNumber(averageShelfTemperature);
	}

	async getTemperatureForShelf(shelf: Shelf) {
		const randomOffset = randomInclusiveFloat(-5, 5);

		const newUnsafeTemperature = shelf.currentTemperature.value + randomOffset;
		const newTemperature = clampNumberToMinMax(
			newUnsafeTemperature,
			shelf.temperatureRange.minimal.value,
			shelf.temperatureRange.maximal.value
		);

		return CelsiusDegrees.fromNumber(newTemperature);
	}
}
