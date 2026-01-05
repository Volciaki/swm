import { UnauthorizedError, UserDTO, UUID, UUIDManager } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { CreateShelfDTO } from "../dto/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { CellDTO } from "../dto/shared/CellDTO";

const generateCellDTOsForShape = (
    shape: { columns: number; rows: number },
    uuidGenerator: () => UUID,
    shelfId: UUID,
): CellDTO[][] => {
    const shelfCellDTOs: CellDTO[][] = [];

    for (let i = 0; i < shape.rows; i++) {
        const row: CellDTO[] = [];
        for (let j = 0; j < shape.columns; j++) {
            row.push({
                id: uuidGenerator().value,
                shelfId: shelfId.value,
                assortment: null,
            });
        }
        shelfCellDTOs.push(row);
    }

    return shelfCellDTOs;
};

export class CreateShelf {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly uuidManager: UUIDManager,
    ) {}

    async execute(dto: CreateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelfId = this.uuidManager.generate();
        const shelfCellDTOs = generateCellDTOsForShape(dto.cellsShape, this.uuidManager.generate, shelfId);
        const shelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto,
            id: shelfId.value,
            cells: shelfCellDTOs,
        });
        await this.shelfRepository.create(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
