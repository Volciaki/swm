import { UnauthorizedError, UserDTO } from "@/server/utils";
import { DeleteShelfDTO } from "../dto/DeleteShelfDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";

export class DeleteShelf {
    constructor(
        private readonly shelfHelper: ShelfHelper,
        private readonly shelfRepository: ShelfRepository,
    ) {}

    async execute(dto: DeleteShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id);
        await this.shelfRepository.delete(shelf);
    }
}
