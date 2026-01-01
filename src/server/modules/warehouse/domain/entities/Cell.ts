import { UUID } from "@/server/utils";

// Represents a single slot for storing Assortment on a Shelf.
// This is fully owned by Shelf, and does not have its own repository.
export class Cell {
    private constructor(
        private _id: UUID,
        private _shelfId: UUID,
        private _assortmentId: UUID | null,
    ) {}

    get id() { return this._id };
    get shelfId() { return this._shelfId };
    get assortmentId() { return this._assortmentId };

    set assortmentId(value: UUID | null) { this._assortmentId = value };

    static create(id: UUID, shelfId: UUID, assortmentId: UUID | null) {
        return new Cell(id, shelfId, assortmentId);
    }
}
