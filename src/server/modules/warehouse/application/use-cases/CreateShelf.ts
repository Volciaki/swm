import { UnauthorizedError, UserDTO, UUIDManager } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { CreateShelfDTO } from "../dto/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class CreateShelf {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly uuidManager: UUIDManager,
    ) {}

    async execute(dto: CreateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelfId = this.uuidManager.generate();
        const shelfCellDTOs = dto.cells.map(
            (row) => row.map(
                (cell) => ({
                    id: this.uuidManager.generate().value,
                    shelfId: shelfId.value,
                    assortment: cell.assortment,
                }),
            ),
        );
        const shelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto,
            id: shelfId.value,
            cells: shelfCellDTOs,
        });
        await this.shelfRepository.create(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
