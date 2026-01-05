import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { UpdateShelfDTO } from "../dto/UpdateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { CellMapper } from "../../infrastructure/mappers/CellMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

export class UpdateShelf {
    constructor(
        private readonly shelfHelper: ShelfHelper,
        private readonly shelfRepository: ShelfRepository,
    ) {}

    async execute(dto: UpdateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id);

        const newShelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto.newData,
            id: shelf.id.value,
            cells: shelf.cells.map((row) => row.map((cell) => CellMapper.fromCellToCellDTO(cell))),
        });

        const { name, comment, maxAssortmentSize, maxWeight, temperatureRange } = newShelf
        shelf.name = name;
        shelf.comment = comment;
        shelf.maxAssortmentSize = maxAssortmentSize;
        shelf.maxWeight = maxWeight;
        shelf.temperatureRange = temperatureRange;
        await this.shelfRepository.update(shelf);

        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
