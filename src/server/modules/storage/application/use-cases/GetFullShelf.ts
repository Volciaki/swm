import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { GetFullShelfDTO } from "../dto/GetFullShelfDTO";
import { getFullShelfResponseDTOSchema, type GetFullShelfResponseDTO } from "../dto/GetFullShelfResponseDTO";

export class GetFullShelf {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelf: GetShelf
	) {}

	async execute(dto: GetFullShelfDTO): Promise<GetFullShelfResponseDTO> {
		const assortments = await this.getAllAssortment.execute();
		const shelf = await this.getShelf.execute({
			id: dto.id,
			assortmentContext: assortments,
		});

		// This is safe to do. `warehouse` module's `getShelf` returns the shelf with fully saturated cells.
		// It's just that they're typed as `warehouse`'s `AssortmentVO`, which only includes some necessary fields for validation.
		const fullShelf = getFullShelfResponseDTOSchema.parse(shelf);
		return fullShelf;
	}
}
