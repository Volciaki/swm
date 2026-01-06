import { InvalidTimeFrameError } from "./error";

export class TimeFrame {
    private constructor(private readonly _seconds: number) {}

    get seconds() { return this._seconds };

    static fromSeconds(value: number) {
        if (value < 0) throw new InvalidTimeFrameError(value);
        return new TimeFrame(value);
    }
}
