import type { CelsiusDegrees } from "../entity";
import { InvalidTemperatureRangeError } from "./error";

export class TemperatureRange {
	private constructor(
		private readonly _minimal: CelsiusDegrees,
		private readonly _maximal: CelsiusDegrees
	) {}

	get minimal() {
		return this._minimal;
	}
	get maximal() {
		return this._maximal;
	}

	static create({ minimal, maximal }: { minimal: CelsiusDegrees; maximal: CelsiusDegrees }) {
		if (minimal > maximal)
			throw new InvalidTemperatureRangeError({
				minimalTemperatureCelsius: minimal.toString(),
				maximalTemperatureCelsius: maximal.toString(),
			});

		return new TemperatureRange(minimal, maximal);
	}
}
