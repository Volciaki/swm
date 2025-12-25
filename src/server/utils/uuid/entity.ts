import { DefaultUUIDManager } from "./infrastructure";
import { InvalidUUIDError } from "./error";

export class UUID {
    private constructor(private readonly _value: string) {}

    static fromString(value: string) {
        const uuidManager = new DefaultUUIDManager();
        if (!uuidManager.validate(value)) throw new InvalidUUIDError(value);

        return new UUID(value);
    }

    get value() { return this._value };
}
