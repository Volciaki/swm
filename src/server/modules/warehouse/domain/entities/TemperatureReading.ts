import { CelsiusDegrees, UUID } from "@/server/utils";
import { Shelf } from "./Shelf";

export class TemperatureReading {
	private constructor(
        private readonly _id: UUID,
        private readonly _shelf: Shelf,
		private readonly _date: Date,
		private readonly _temperature: CelsiusDegrees,
		private readonly _temperatureWasTooHigh: boolean,
		private readonly _temperatureWasTooLow: boolean,
	) {}

	get id() { return this._id };
	get shelf() { return this._shelf };
	get date() { return this._date };
	get temperature() { return this._temperature };
	get temperatureWasTooLow() { return this._temperatureWasTooLow };
	get temperatureWasTooHigh() { return this._temperatureWasTooHigh };

	static createNew(id: UUID, shelf: Shelf, date: Date) {
		return new TemperatureReading(
			id,
			shelf,
			date,
			shelf.currentTemperature,
			shelf.currentTemperature.value > shelf.temperatureRange.maximal.value,
			shelf.currentTemperature.value < shelf.temperatureRange.minimal.value,
		);
	}

	static create(
		id: UUID,
		shelf: Shelf,
		date: Date,
		temperature: CelsiusDegrees,
		temperatureWasTooHigh: boolean,
		temperatureWasTooLow: boolean,
	) {
		return new TemperatureReading(
			id,
			shelf,
			date,
			temperature,
			temperatureWasTooHigh,
			temperatureWasTooLow,
		);
	}
}
