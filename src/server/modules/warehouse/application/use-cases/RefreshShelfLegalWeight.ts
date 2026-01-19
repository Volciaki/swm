import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { RefreshShelfLegalWeightDTO } from "../dto/RefreshShelfLegalWeightDTO";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class RefreshShelfLegalWeight {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly shelfRepository: ShelfRepository,
	) {}

	async execute(dto: RefreshShelfLegalWeightDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);
		shelf.updateLastRecordedLegalWeight();

		await this.shelfRepository.update(shelf);
		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
