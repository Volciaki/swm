import { attempt } from "../errors";
import { PositiveNumber } from "../numbers/positive";
import { InvalidTimeFrameError } from "./error";

export class TimeFrame {
	private readonly _seconds: PositiveNumber;

	private constructor(seconds: number) {
		const positive = attempt(() => PositiveNumber.create(seconds));
		if (positive instanceof Error) throw new InvalidTimeFrameError({ value: seconds });

		this._seconds = PositiveNumber.create(seconds);
	}

	get seconds() {
		return this._seconds;
	}
	get milliseconds() {
		return PositiveNumber.create(this.seconds.value * 1000);
	}

	static fromSeconds(value: number) {
		return new TimeFrame(value);
	}

	static fromMilliseconds(value: number) {
		return new TimeFrame(value / 1000);
	}
}
