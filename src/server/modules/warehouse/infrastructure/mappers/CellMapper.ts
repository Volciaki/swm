import { UUID } from "@/server/utils";
import { CellDTO } from "../../application/dto/shared/CellDTO";
import { Cell } from "../../domain/entities/Cell";
import { DBCell } from "../entities/DBCell";

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

    static fromDBCellToCell(dbCell: DBCell): Cell {
        const { id, shelfId, assortmentId } = dbCell;
        return Cell.create(
            UUID.fromString(id),
            UUID.fromString(shelfId),
            assortmentId === null ? null : UUID.fromString(assortmentId),
        );
    }

    static fromCellToDBCell(cell: Cell): DBCell {
        const dbCell = new DBCell();

        dbCell.id = cell.id.value;
        dbCell.shelfId = cell.shelfId.value;
        dbCell.assortmentId = cell.assortmentId === null ? null : cell.assortmentId.value;

        return dbCell;
    }
}
