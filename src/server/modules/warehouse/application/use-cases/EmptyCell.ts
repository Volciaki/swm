import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { EmptyCellDTO } from "../dto/EmptyCellDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { CellNotFoundError } from "../errors/CellNotFoundError";

export class EmptyCell {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly shelfHelper: ShelfHelper,
    ) {}

    async execute(dto: EmptyCellDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.shelf.id, dto.shelf.assortmentContext);
        
        const cellId = UUID.fromString(dto.cellId);
        const cell = shelf.cells.flat().find((cell) => cell.id.value === cellId.value);
        if (!cell) throw new CellNotFoundError(cellId);

        cell.assortment = null;

        await this.shelfRepository.update(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
