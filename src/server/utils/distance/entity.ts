import { NegativeDistanceError } from "./error";

export class Distance {
    private constructor(private readonly _millimeters: number) {
        if (_millimeters < 0) throw new NegativeDistanceError(_millimeters);
    }

    get millimeters() { return this._millimeters };

    static fromMillimeters(value: number) {
        return new Distance(value);
    }

    // JS calls this by default to support comparison operators (`>`, `<`, etc.).
    private valueOf() {
        return this.millimeters;
    }

    public toSringMillimeters() {
        return `${this.millimeters}mm`;
    }
}
