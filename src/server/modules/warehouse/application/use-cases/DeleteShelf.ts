import { UnauthorizedError, UserDTO } from "@/server/utils";
import { DeleteShelfDTO } from "../dto/DeleteShelfDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { NotEnoughShelves } from "../errors/NotEnoughShelves";

// Ensures that at least ... shelves need to be defined.
const MINIMAL_AMOUNT_OF_SHELVES=4;

export class DeleteShelf {
    constructor(
        private readonly shelfHelper: ShelfHelper,
        private readonly shelfRepository: ShelfRepository,
    ) {}

    async execute(dto: DeleteShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const currentShelves = await this.shelfRepository.getAll();
        if (currentShelves.length <= MINIMAL_AMOUNT_OF_SHELVES) throw new NotEnoughShelves(MINIMAL_AMOUNT_OF_SHELVES);

        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);
        await this.shelfRepository.delete(shelf);
    }
}
