import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { ImportShelvesDTO } from "../dto/ImportShelvesDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import type { ShelfHelper } from "../helpers/ShelfHelper";

export class ImportShelves {
	constructor(private readonly shelfHelper: ShelfHelper) {}

	async execute(dto: ImportShelvesDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const shelves = await Promise.all(dto.shelves.map(async (shelf) => await this.shelfHelper.createByDTO(shelf)));
		return shelves.map((shelf) => ShelfMapper.fromShelfToShelfDTO(shelf));
	}
}
