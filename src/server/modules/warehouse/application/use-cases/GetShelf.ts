import { GetShelfDTO } from "../dto/GetShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { ShelfHelper } from "../helpers/ShelfHelper";

export class GetShelf {
	constructor(private readonly shelfHelper: ShelfHelper) {}

	async execute(dto: GetShelfDTO) {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);
		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
