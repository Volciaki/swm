import { Distance } from "../distance";

export class Dimensions {
    private constructor(
        private readonly _width: Distance,
        private readonly _height: Distance,
        private readonly _length: Distance,
    ) {}

    static create(width: Distance, height: Distance, length: Distance) {
        return new Dimensions(width, height, length);
    }
}
