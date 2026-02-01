import type { UUID, TemperatureRange, Weight, Dimensions, TimeFrame } from "@/server/utils";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";

export class AssortmentDefinition {
	private constructor(
		private _id: UUID,
		private _name: string,
		private _qrCode: FileReference,
		private _image: FileReference | null,
		private _temperatureRange: TemperatureRange,
		private _weight: Weight,
		private _size: Dimensions,
		private _comment: string,
		private _expiresAfter: TimeFrame,
		private _isHazardous: boolean
	) {}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get temperatureRange() {
		return this._temperatureRange;
	}
	get weight() {
		return this._weight;
	}
	get size() {
		return this._size;
	}
	get comment() {
		return this._comment;
	}
	get expiresAfter() {
		return this._expiresAfter;
	}
	get isHazardous() {
		return this._isHazardous;
	}
	get image() {
		return this._image;
	}
	get qrCode() {
		return this._qrCode;
	}

	set name(value: string) {
		this._name = value;
	}
	set temperatureRange(value: TemperatureRange) {
		this._temperatureRange = value;
	}
	set weight(value: Weight) {
		this._weight = value;
	}
	set size(value: Dimensions) {
		this._size = value;
	}
	set comment(value: string) {
		this._comment = value;
	}
	set expiresAfter(value: TimeFrame) {
		this._expiresAfter = value;
	}
	set isHazardous(value: boolean) {
		this._isHazardous = value;
	}
	set image(value: FileReference | null) {
		this._image = value;
	}

	static create(
		id: UUID,
		name: string,
		qrCode: FileReference,
		image: FileReference | null,
		temperatureRange: TemperatureRange,
		weight: Weight,
		size: Dimensions,
		comment: string,
		expiresAfter: TimeFrame,
		isHazardous: boolean
	) {
		return new AssortmentDefinition(
			id,
			name,
			qrCode,
			image,
			temperatureRange,
			weight,
			size,
			comment,
			expiresAfter,
			isHazardous
		);
	}
}
