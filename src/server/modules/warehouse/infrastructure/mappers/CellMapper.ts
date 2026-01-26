import { UUID } from "@/server/utils";
import type { CellDTO } from "../../application/dto/shared/CellDTO";
import { Cell } from "../../domain/entities/Cell";
import { DBCell } from "../entities/DBCell";
import type { AssortmentVO } from "../../domain/vo/AssortmentVO";

export class CellMapper {
	static fromCellDTOToCell(cellDTO: CellDTO): Cell {
		const { id, shelfId, assortment } = cellDTO;
		return Cell.create(UUID.fromString(id), UUID.fromString(shelfId), assortment);
	}

	static fromCellToCellDTO(cell: Cell): CellDTO {
		const { id, shelfId, assortment } = cell;
		return {
			id: id.value,
			shelfId: shelfId.value,
			assortment,
		};
	}

	static fromDBCellToCell(dbCell: DBCell, assortment: AssortmentVO | null): Cell {
		const { id, shelfId } = dbCell;
		return Cell.create(UUID.fromString(id), UUID.fromString(shelfId), assortment);
	}

	static fromCellToDBCell(cell: Cell): DBCell {
		const dbCell = new DBCell();

		dbCell.id = cell.id.value;
		dbCell.shelfId = cell.shelfId.value;
		dbCell.assortmentId = cell.assortment === null ? null : cell.assortment.id;

		return dbCell;
	}
}
