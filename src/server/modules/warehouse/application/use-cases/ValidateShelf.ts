import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { ValidateShelfDTO } from "../dto/ValidateShelfDTO";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class ValidateShelf {
	constructor(private readonly shelfHelper: ShelfHelper) {}

	async execute(dto: ValidateShelfDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);
		shelf.validate();

		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
