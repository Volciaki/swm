import { UUID, UUIDManager } from "@/server/utils";
import { Shelf } from "../../domain/entities/Shelf";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";
import { CellDTO } from "../dto/shared/CellDTO";
import { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

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

export interface ShelfHelper {
    getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]): Promise<Shelf>;
    createShelfByDTO(dto: CreateShelfDTO): Promise<Shelf>;
};

export class DefaultShelfHelper implements ShelfHelper {
    constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly uuidManager: UUIDManager,
    ) {}

    async getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]) {
        const shelfId = UUID.fromString(id);
        const shelf = await this.shelfRepository.getById(shelfId, assortmentContext);

        if (shelf === null) throw new ShelfNotFoundError(shelfId);

        return shelf;
    }

    async createShelfByDTO(dto: CreateShelfDTO) {
        const shelfId = this.uuidManager.generate();
        const shelfCellDTOs = generateCellDTOsForShape(dto.cellsShape, this.uuidManager.generate, shelfId);
        const shelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto,
            id: shelfId.value,
            cells: shelfCellDTOs,
        });

        await this.shelfRepository.create(shelf);
        return shelf;
    }
}
