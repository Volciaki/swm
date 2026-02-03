import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { assortmentDTOsToAssortmentVOs } from "@/server/utils";
import { getFullShelfResponseDTOSchema, type GetFullShelfResponseDTO } from "../dto/GetFullShelfResponseDTO";

export interface StorageShelfHelper {
	getByIdStringOrThrow(id: string): Promise<GetFullShelfResponseDTO>;
}

export class DefaultStorageShelfHelper implements StorageShelfHelper {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelf: GetShelf
	) {}

	async getByIdStringOrThrow(id: string) {
		const assortments = await this.getAllAssortment.execute();
		const assortmentContext = assortmentDTOsToAssortmentVOs(assortments);
		const shelf = await this.getShelf.execute({
			id,
			assortmentContext,
		});

		// This is safe to do. `warehouse` module's `getShelf` returns the shelf with fully saturated cells.
		// It's just that they're typed as `warehouse`'s `AssortmentVO`, which only includes some necessary fields for validation.
		const fullShelf = getFullShelfResponseDTOSchema.parse(shelf);
		return fullShelf;
	}
}
