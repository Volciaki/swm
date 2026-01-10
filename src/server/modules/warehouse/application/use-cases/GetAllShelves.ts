import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class GetAllShelves {
	constructor(private readonly shelfRepository: ShelfRepository) {}

	async execute() {
		const shelves = await this.shelfRepository.getAll();
		return shelves.map((shelf) => ShelfMapper.fromShelfToShelfDTO(shelf));
	}
}
