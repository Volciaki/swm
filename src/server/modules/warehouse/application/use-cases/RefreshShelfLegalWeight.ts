import type { ShelfHelper } from "../helpers/ShelfHelper";
import type { RefreshShelfLegalWeightDTO } from "../dto/RefreshShelfLegalWeightDTO";
import type { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class RefreshShelfLegalWeight {
	constructor(
		private readonly shelfHelper: ShelfHelper,
		private readonly shelfRepository: ShelfRepository
	) {}

	async execute(dto: RefreshShelfLegalWeightDTO) {
		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.id, dto.assortmentContext);
		shelf.updateLastRecordedLegalWeight();

		await this.shelfRepository.update(shelf);
		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
