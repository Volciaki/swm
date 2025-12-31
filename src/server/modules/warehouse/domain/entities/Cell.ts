import { UUID } from "crypto";

export class Cell {
    private constructor(
        id: UUID,
        shelfId: UUID,
        // TODO: ???
        assortmentId: UUID,
    ) {}

    static create(id: UUID, shelfId: UUID, assortmentId: UUID) {
        return new Cell(id, shelfId, assortmentId);
    }
}
