import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";
import type { ShelfHelper } from "../helpers/ShelfHelper";

export class CreateShelf {
	constructor(private readonly shelfHelper: ShelfHelper) {}

	async execute(dto: CreateShelfDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const shelf = await this.shelfHelper.createByDTO(dto);
		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
