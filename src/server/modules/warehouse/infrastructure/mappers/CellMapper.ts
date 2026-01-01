import { UUID } from "@/server/utils";
import { CellDTO } from "../../application/dto/shared/CellDTO";
import { Cell } from "../../domain/entities/Cell";

export class CellMapper {
    static fromCellDTOToCell(cellDTO: CellDTO): Cell {
        const { id, shelfId, assortmentId } = cellDTO;
        return Cell.create(
            UUID.fromString(id),
            UUID.fromString(shelfId),
            assortmentId === null ? null : UUID.fromString(assortmentId),
        );
    }

    static fromCellToCellDTO(cell: Cell): CellDTO {
        const { id, shelfId, assortmentId } = cell;
        return {
            id: id.value,
            shelfId: shelfId.value,
            assortmentId: assortmentId === null ? null : assortmentId.value,
        };
    }
}
