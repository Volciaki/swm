import { UnauthorizedError, UserDTO } from "@/server/utils";
import { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

export class CreateShelf {
    constructor( private readonly shelfHelper: ShelfHelper) {}

    async execute(dto: CreateShelfDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const shelf = await this.shelfHelper.createShelfByDTO(dto);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
