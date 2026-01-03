import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { EmptyCellDTO } from "../dto/EmptyCell";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { CellNotFoundError } from "../errors/CellNotFoundError";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class EmptyCell {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly shelfHelper: ShelfHelper,
    ) {}

    async execute(dto: EmptyCellDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.shelfId);
        const cellId = UUID.fromString(dto.cellId);
        const cell = shelf.cells.flat().find((cell) => cell.id.value === cellId.value);

        if (!cell) throw new CellNotFoundError(cellId);

        cell.assortment = null;

        await this.shelfRepository.update(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
