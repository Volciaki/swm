import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";
import { UpdateCellDTO, UpdateShelfDTO } from "../dto/UpdateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { Cell } from "../../domain/entities/Cell";
import { CellMapper } from "../../infrastructure/mappers/CellMapper";

const getNewCellsAfterUpdate = (cells: Cell[], updatedCells: UpdateCellDTO[]): Cell[] => {
    return cells.map((cell) => {
        const cellInUpdateDTO = updatedCells.find((updatedCell) => UUID.fromString(updatedCell.id).value === cell.id.value);

        if (!cellInUpdateDTO) return cell;

        const newCell = Cell.create(
            cell.id,
            cell.shelfId,
            cellInUpdateDTO.assortment,
        );
        return newCell;
    });
};

export class UpdateShelf {
    constructor(private readonly shelfRepository: ShelfRepository) {}

    async execute(dto: UpdateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelfId = UUID.fromString(dto.id);
        const shelf = await this.shelfRepository.getById(shelfId);

        if (!shelf) throw new ShelfNotFoundError(shelfId);

        const newShelfRows = getNewCellsAfterUpdate(shelf.rows, dto.newData.rows);
        const newShelfColumns = getNewCellsAfterUpdate(shelf.columns, dto.newData.columns);

        const newShelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto.newData,
            id: shelfId.value,
            rows: newShelfRows.map((row) => CellMapper.fromCellToCellDTO(row)),
            columns: newShelfColumns.map((column) => CellMapper.fromCellToCellDTO(column)),
        });

        const { name, comment, columns, rows, maxAssortmentSize, maxWeight, temperatureRange } = newShelf
        shelf.name = name;
        shelf.comment = comment;
        shelf.columns = columns;
        shelf.rows = rows;
        shelf.maxAssortmentSize = maxAssortmentSize;
        shelf.maxWeight = maxWeight;
        shelf.temperatureRange = temperatureRange;
        await this.shelfRepository.update(shelf);

        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
