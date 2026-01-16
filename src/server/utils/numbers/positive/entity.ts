import { NegativeNumberError } from "./error";

export class PositiveNumber {
	private constructor(private readonly _value: number) {}

	get value() { return this._value };

	static create(value: number) {
		if (value < 0) throw new NegativeNumberError(value);
		return new PositiveNumber(value);
	}

	public valueOf() {
		return this.value;
	}
}
