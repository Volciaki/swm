import { UnauthorizedError, UserDTO, UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { FillCellDTO } from "../dto/FillCellDTO";
import { ShelfHelper } from "../helpers/ShelfHelper";
import { ShelfMapper } from "../../infrastructure/mappers/ShelfMapper";

export class FillCell {
	constructor(
        private readonly shelfRepository: ShelfRepository,
        private readonly shelfHelper: ShelfHelper,
	) {}

	async execute(dto: FillCellDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const shelf = await this.shelfHelper.getByIdStringOrThrow(dto.shelf.id, dto.shelf.assortmentContext);

		const cellId = UUID.fromString(dto.cellId);
		const assortmentId = UUID.fromString(dto.assortment.id);

		shelf.setCellsAssortmentById(cellId, {
			...dto.assortment,
			id: assortmentId.value,
		});
		shelf.updateLastRecordedLegalWeight();

		await this.shelfRepository.update(shelf);
		return ShelfMapper.fromShelfToShelfDTO(shelf);
	}
}
