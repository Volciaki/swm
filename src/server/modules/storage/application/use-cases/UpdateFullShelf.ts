import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { UpdateFullShelfDTO } from "../dto/UpdateFullShelf";

export class UpdateFullShelf {
	constructor(
		private readonly getAllAssortmentAction: GetAllAssortment,
		private readonly getShelf: GetShelf,
		private readonly updateShelfAction: UpdateShelf
	) {}

	async execute(dto: UpdateFullShelfDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortments = await this.getAllAssortmentAction.execute();
		const shelf = await this.getShelf.execute({
			id: dto.shelfId,
			assortmentContext: assortments,
		});

		return await this.updateShelfAction.execute(
			{
				shelf: {
					id: dto.shelfId,
					assortmentContext: assortments,
				},
				newData: {
					...dto.newData,
					currentTemperatureCelsius: shelf.currentTemperatureCelsius,
				},
			},
			undefined,
			currentUser
		);
	}
}
