import { NegativeDistanceError } from "./error";

export class Distance {
    private constructor(private readonly _millimeters: number) {
        if (_millimeters < 0) throw new NegativeDistanceError(_millimeters);
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
