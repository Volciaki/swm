import { attempt } from "../errors";
import { PositiveNumber } from "../numbers/positive";
import { NegativeDistanceError } from "./error";

export class Distance {
	private readonly _millimeters: PositiveNumber;

	private constructor(value: number) {
		const positive = attempt(() => PositiveNumber.create(value));
		if (positive instanceof Error) throw new NegativeDistanceError(value);

		this._millimeters = positive;
	}

	get millimeters() { return this._millimeters };

	static fromMillimeters(value: number) {
		return new Distance(value);
	}

	public toSringMillimeters() {
		return `${this.millimeters}mm`;
	}

	public valueOf() {
		return this.millimeters;
	}
}
