import { PositiveNumber, UUID } from "@/server/utils";
import type { CellDTO } from "../../application/dto/shared/CellDTO";
import { Cell } from "../../domain/entities/Cell";
import { DBCell } from "../entities/DBCell";
import type { AssortmentVO } from "../../domain/vo/AssortmentVO";

export class CellMapper {
	static fromCellDTOToCell(cellDTO: CellDTO): Cell {
		const { id, shelfId, assortment, x, y, index } = cellDTO;
		return Cell.create(
			UUID.fromString(id),
			UUID.fromString(shelfId),
			assortment,
			PositiveNumber.create(x),
			PositiveNumber.create(y),
			PositiveNumber.create(index)
		);
	}

	static fromCellToCellDTO(cell: Cell): CellDTO {
		const { id, shelfId, assortment, x, y, index } = cell;
		return {
			id: id.value,
			shelfId: shelfId.value,
			x: x.value,
			y: y.value,
			index: index.value,
			assortment,
		};
	}

	static fromDBCellToCell(dbCell: DBCell, assortment: AssortmentVO | null): Cell {
		const { id, shelfId, x, y, index } = dbCell;
		return Cell.create(
			UUID.fromString(id),
			UUID.fromString(shelfId),
			assortment,
			PositiveNumber.create(x),
			PositiveNumber.create(y),
			PositiveNumber.create(index)
		);
	}

	static fromCellToDBCell(cell: Cell): DBCell {
		const dbCell = new DBCell();

		dbCell.id = cell.id.value;
		dbCell.shelfId = cell.shelfId.value;
		dbCell.assortmentId = cell.assortment === null ? null : cell.assortment.id;
		dbCell.x = cell.x.value;
		dbCell.y = cell.y.value;
		dbCell.index = cell.index.value;

		return dbCell;
	}
}
