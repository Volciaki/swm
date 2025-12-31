import { NegativeDistanceError } from "./error";

export class Distance {
    private constructor(private readonly _value: number) {}

    static fromMillimeters(value: number) {
        if (value < 0) throw new NegativeDistanceError(value);

        return new Distance(value);
    }
}
