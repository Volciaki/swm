import { UUID } from "@/server/utils";

export class Cell {
    private constructor(
        private _id: UUID,
        private _shelfId: UUID,
        private _assortmentId: UUID | null,
    ) {}

    get assortmentId() { return this._assortmentId };

    set assortmentId(value: UUID | null) { this._assortmentId = value };

    static create(id: UUID, shelfId: UUID, assortmentId: UUID) {
        return new Cell(id, shelfId, assortmentId);
    }
}
