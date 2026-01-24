import { PositiveNumber } from "@/server/utils/numbers/positive"

export class QRCode<D = string> {
	private constructor(
		private readonly _data: D,
		private readonly _size: PositiveNumber,
	) {}

	get data() { return this._data };
	get size() { return this._size };

	static create<D = string>(data: D, size: PositiveNumber) {
		return new QRCode(data, size);
	}
}
