import { Distance } from "../distance";

export class Dimensions {
	private constructor(
        private readonly _width: Distance,
        private readonly _height: Distance,
        private readonly _length: Distance,
	) {}

	get width() { return this._width };
	get height() { return this._height };
	get length() { return this._length };

	static create(width: Distance, height: Distance, length: Distance) {
		return new Dimensions(width, height, length);
	}
}
