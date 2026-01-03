import { GetShelfDTO } from "../dto/GetShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

export class GetShelf {
    constructor(private readonly shelfHelper: ShelfHelper) {}

    async execute(dto: GetShelfDTO) {
        const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id);
        return ShelfMapper.fromShelfToShelfDTO(shelf);
    }
}
