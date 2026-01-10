import { UUID } from "@/server/utils";
import { AssortmentVO } from "../vo/AssortmentVO";

// Represents a single slot for storing Assortment on a Shelf.
// This is fully owned by Shelf, and does not have its own repository.
export class Cell {
	private constructor(
        private _id: UUID,
        private _shelfId: UUID,
        private _assortment: AssortmentVO | null,
	) {}

	get id() { return this._id };
	get shelfId() { return this._shelfId };
	get assortment() { return this._assortment };

	set assortment(value: AssortmentVO | null) { this._assortment = value };

	static create(id: UUID, shelfId: UUID, assortment: AssortmentVO | null) {
		return new Cell(id, shelfId, assortment);
	}
}
