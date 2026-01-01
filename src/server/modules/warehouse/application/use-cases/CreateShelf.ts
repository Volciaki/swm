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

        const shelf = ShelfMapper.fromShelfDTOToShelf({
            ...dto,
            id: this.uuidManager.generate().value,
        });
        await this.shelfRepository.create(shelf);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
