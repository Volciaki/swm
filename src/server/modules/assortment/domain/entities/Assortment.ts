import { UUID, TemperatureRange, Weight, Dimensions, TimeFrame } from "@/server/utils";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";

export class Assortment {
	private constructor(
		private _id: UUID,
		private _cellId: UUID,
		private _shelfId: UUID,
		private _name: string,
		private _qrCode: FileReference,
		private _image: FileReference | null,
		private _temperatureRange: TemperatureRange,
		private _weight: Weight,
		private _size: Dimensions,
		private _comment: string,
		private _storedAt: Date,
		private _expiresAfter: TimeFrame,
		private _isHazardous: boolean,
	) { }

	get id() { return this._id };
	get cellId() { return this._cellId };
	get shelfId() { return this._shelfId };
	get name() { return this._name };
	get temperatureRange() { return this._temperatureRange };
	get weight() { return this._weight };
	get size() { return this._size };
	get comment() { return this._comment };
	get storedAt() { return this._storedAt };
	get expiresAfter() { return this._expiresAfter };
	get isHazardous() { return this._isHazardous };
	get image() { return this._image };
	get qrCode() { return this._qrCode };

	set name(value: string) { this._name = value };
	set temperatureRange(value: TemperatureRange) { this._temperatureRange = value };
	set weight(value: Weight) { this._weight = value };
	set size(value: Dimensions) { this._size = value };
	set comment(value: string) { this._comment = value };
	set expiresAfter(value: TimeFrame) { this._expiresAfter = value };
	set isHazardous(value: boolean) { this._isHazardous = value };
	set image(value: FileReference | null) { this._image = value };

	static create(
		id: UUID,
		cellId: UUID,
		shelfId: UUID,
		name: string,
		qrCode: FileReference,
		image: FileReference | null,
		temperatureRange: TemperatureRange,
		weight: Weight,
		size: Dimensions,
		comment: string,
		storedAt: Date,
		expiresAfter: TimeFrame,
		isHazardous: boolean,
	) {
		return new Assortment(
			id,
			cellId,
			shelfId,
			name,
			qrCode,
			image,
			temperatureRange,
			weight,
			size,
			comment,
			storedAt,
			expiresAfter,
			isHazardous,
		);
	}
}
