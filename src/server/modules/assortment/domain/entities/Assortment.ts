import { UUID, TemperatureRange, Weight, Dimensions, TimeFrame } from "@/server/utils";

export class Assortment {
    private constructor(
        private _id: UUID,
        private _name: string,
        // TODO: Hm.. will it be easier to use a QR code or a line code here?
        // private qrCode: string,
        // TODO: do we want to create some util aggregate? something like an `Asset`.
        // private image: string,
        private _temperatureRange: TemperatureRange,
        private _weight: Weight,
        private _size: Dimensions,
        private _comment: string,
        private _storedAt: Date,
        private _expiresAfter: TimeFrame,
    ) {}

    get id() { return this._id };
    get name() { return this._name };
    get temperatureRange() { return this._temperatureRange };
    get weight() { return this._weight };
    get size() { return this._size };
    get comment() { return this._comment };
    get storedAt() { return this._storedAt };
    get expiresAfter() { return this._expiresAfter };

    static create(
        id: UUID,
        name: string,
        temperatureRange: TemperatureRange,
        weight: Weight,
        size: Dimensions,
        comment: string,
        storedAt: Date,
        expiresAfter: TimeFrame,
    ) {
        return new Assortment(
            id,
            name,
            temperatureRange,
            weight,
            size,
            comment,
            storedAt,
            expiresAfter,
        );
    }
}
