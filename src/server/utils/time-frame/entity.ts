import { attempt } from "../errors";
import { PositiveNumber } from "../numbers/positive";
import { InvalidTimeFrameError } from "./error";

export class TimeFrame {
	private constructor(private readonly _seconds: PositiveNumber) {}

	get seconds() { return this._seconds };
	get milliseconds() { return PositiveNumber.create(this.seconds.value * 1000) };

	static fromSeconds(value: number) {
		const positive = attempt(() => PositiveNumber.create(value));
		if (positive instanceof Error) throw new InvalidTimeFrameError(value);

		return new TimeFrame(positive);
	}
}
