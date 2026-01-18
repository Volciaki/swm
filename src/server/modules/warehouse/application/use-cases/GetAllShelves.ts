import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import { GetAllShelvesDTO } from "../dto/GetAllShelvesDTO";

export class GetAllShelves {
	constructor(private readonly shelfRepository: ShelfRepository) {}

	async execute(dto?: GetAllShelvesDTO) {
		const shelves = await this.shelfRepository.getAll(dto?.assortmentContext);
		return shelves.map((shelf) => ShelfMapper.fromShelfToShelfDTO(shelf));
	}
}
