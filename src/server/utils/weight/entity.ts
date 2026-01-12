import { attempt } from "../errors";
import { PositiveNumber } from "../numbers/positive";
import { NegativeWeightError } from "./error";

export class Weight {
	private readonly _grams: PositiveNumber;

	private constructor(value: number) {
		const positive = attempt(() => PositiveNumber.create(value));
		if (positive instanceof Error) throw new NegativeWeightError(value);

		this._grams = positive;
	}

	get grams() { return this._grams };
	get kilograms() { return PositiveNumber.create(this.grams.value / 1000) };

	static fromGrams(value: number) {
		return new Weight(value);
	}

	static fromKilograms(value: number) {
		return new Weight(value * 1000);
	}

	public toStringKilograms() {
		return `${this.kilograms}kg`;
	}

	public toStringGrams() {
		return `${this.grams}g`;
	}
}
