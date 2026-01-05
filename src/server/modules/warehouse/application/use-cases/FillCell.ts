import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { FillCellDTO } from "../dto/FillCellDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { CellNotFoundError } from "../errors/CellNotFoundError";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class FillCell {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly shelfHelper: ShelfHelper,
    ) {}

    async execute(dto: FillCellDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.shelf.id, dto.shelf.assortmentContext);

        const cellId = UUID.fromString(dto.cellId);
        const cell = shelf.cells.flat().find((cell) => cell.id.value === cellId.value);
        if (!cell) throw new CellNotFoundError(cellId);

        const assortmentId = UUID.fromString(dto.assortment.id);
        cell.assortment = {
            ...dto.assortment,
            id: assortmentId.value,
        };
        shelf.storeAssortment(dto.assortment);

        await this.shelfRepository.update(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
