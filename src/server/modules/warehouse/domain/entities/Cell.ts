import type { PositiveNumber, UUID } from "@/server/utils";
import type { AssortmentVO } from "../vo/AssortmentVO";

// Represents a single slot for storing Assortment on a Shelf.
// This is fully owned by Shelf, and does not have its own repository.
export class Cell {
	private constructor(
		private _id: UUID,
		private _shelfId: UUID,
		private _assortment: AssortmentVO | null,
		private _x: PositiveNumber,
		private _y: PositiveNumber,
		private _index: PositiveNumber
	) {}

	get id() {
		return this._id;
	}
	get shelfId() {
		return this._shelfId;
	}
	get assortment() {
		return this._assortment;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get index() {
		return this._index;
	}

	set assortment(value: AssortmentVO | null) {
		this._assortment = value;
	}

	static create(
		id: UUID,
		shelfId: UUID,
		assortment: AssortmentVO | null,
		x: PositiveNumber,
		y: PositiveNumber,
		index: PositiveNumber
	) {
		return new Cell(id, shelfId, assortment, x, y, index);
	}
}
