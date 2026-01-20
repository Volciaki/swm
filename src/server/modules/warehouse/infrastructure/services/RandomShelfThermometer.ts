import { CelsiusDegrees, average, clampNumberToMinMax, randomInclusiveFloat } from "@/server/utils";
import { ShelfThermometer } from "../../domain/services/ShelfThermometer";
import { Shelf } from "../../domain/entities/Shelf";
import { logger } from "@/server/logger";

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
	
		logger.warn(`random offset: ${randomOffset}`);

		const newUnsafeTemperature = shelf.currentTemperature.value + randomOffset;

		logger.warn(`newUnsafeTemperature: ${newUnsafeTemperature}`);

		const newTemperature = clampNumberToMinMax(
			newUnsafeTemperature,
			shelf.temperatureRange.minimal.value,
			shelf.temperatureRange.maximal.value,
		);
	
		logger.warn(`newSafeTemperature: ${newTemperature}`);

		return CelsiusDegrees.fromNumber(newTemperature);
	}
}
