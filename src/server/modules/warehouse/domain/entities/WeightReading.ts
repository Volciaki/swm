import type { UUID, Weight } from "@/server/utils";
import type { Shelf } from "./Shelf";

export class WeightReading {
	private constructor(
		private readonly _id: UUID,
		private readonly _shelf: Shelf,
		private readonly _date: Date,
		private readonly _weight: Weight
	) {}

	get id() {
		return this._id;
	}
	get shelf() {
		return this._shelf;
	}
	get date() {
		return this._date;
	}
	get weight() {
		return this._weight;
	}

	static createNew(id: UUID, shelf: Shelf) {
		return new WeightReading(id, shelf, new Date(), shelf.currentWeight);
	}

	static create(id: UUID, shelf: Shelf, date: Date, weight: Weight) {
		return new WeightReading(id, shelf, date, weight);
	}
}
