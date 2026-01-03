import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { UpdateCellDTO, UpdateShelfDTO } from "../dto/UpdateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { Cell } from "../../domain/entities/Cell";
import { CellMapper } from "../../infrastructure/mappers/CellMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

const getNewCellsAfterUpdate = (cells: Cell[][], updatedCells: UpdateCellDTO[][]): Cell[][] => {
    return cells.map((row) => row.map((cell) => {
        const cellInUpdateDTO = updatedCells.flat().find(
            (updatedCell) => UUID.fromString(updatedCell.id).value === cell.id.value
        );

        if (!cellInUpdateDTO) return cell;

        const newCell = Cell.create(
            cell.id,
            cell.shelfId,
            cellInUpdateDTO.assortment,
        );
        return newCell;
    }));
};

export class UpdateShelf {
    constructor(
        private readonly shelfHelper: ShelfHelper,
        private readonly shelfRepository: ShelfRepository,
    ) {}

    async execute(dto: UpdateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id);

        const newShelfCells = getNewCellsAfterUpdate(shelf.cells, dto.newData.cells);
        const newShelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto.newData,
            id: shelf.id.value,
            cells: newShelfCells.map(
                (row) => row.map(
                    (cell) => CellMapper.fromCellToCellDTO(cell)
                )
            ),
        });

        const { name, comment, cells, maxAssortmentSize, maxWeight, temperatureRange } = newShelf
        shelf.name = name;
        shelf.comment = comment;
        shelf.cells = cells;
        shelf.maxAssortmentSize = maxAssortmentSize;
        shelf.maxWeight = maxWeight;
        shelf.temperatureRange = temperatureRange;
        await this.shelfRepository.update(shelf);

        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
