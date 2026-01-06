import { NegativeWeightError } from "./error";

export class Weight {
    private constructor(private readonly _grams: number) {
        if (_grams < 0) throw new NegativeWeightError(_grams);
    }

    get grams() { return this._grams };
    get kilograms() { return this.grams / 1000 };

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
