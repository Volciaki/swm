import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { GetFullShelfDTO } from "../dto/GetFullShelfDTO";

export class GetFullShelf {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelf: GetShelf
	) {}

	async execute(dto: GetFullShelfDTO) {
		const assortments = await this.getAllAssortment.execute();
		return await this.getShelf.execute({
			id: dto.id,
			assortmentContext: assortments,
		});
	}
}
