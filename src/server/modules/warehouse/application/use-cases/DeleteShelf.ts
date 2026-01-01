import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { DeleteShelfDTO } from "../dto/DeleteShelfDTO";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";

export class DeleteShelf {
    constructor(private readonly shelfRepository: ShelfRepository) {}

    async execute(dto: DeleteShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelfId = UUID.fromString(dto.id);
        const shelf = await this.shelfRepository.getById(shelfId);

        if (!shelf) throw new ShelfNotFoundError(shelfId);

        await this.shelfRepository.delete(shelf);
    }
}
