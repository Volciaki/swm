import { InvalidTemperatureValueError } from "../error";

const ABSOLUTE_ZERO = -273.15;

const formatCelsiusDegreesAsString = (value: number): string => {
	return `${value}°C`;
};

export class CelsiusDegrees {
	private constructor(private readonly _value: number) {}

	get value() { return this._value };

	static fromNumber(value: number) {
		if (value < ABSOLUTE_ZERO) throw new InvalidTemperatureValueError(formatCelsiusDegreesAsString(value));

		return new CelsiusDegrees(value);
	}

	public toString() {
		return formatCelsiusDegreesAsString(this._value);
	}

	public valueOf() {
		return this.value;
	}
}
