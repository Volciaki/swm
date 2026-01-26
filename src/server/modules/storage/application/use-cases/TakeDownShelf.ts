import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { TakeDownShelfDTO } from "../dto/TakeDownShelfDTO";

export class TakeDownShelf {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly deleteShelfAction: DeleteShelf
	) {}

	async execute(dto: TakeDownShelfDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortments = await this.getAllAssortment.execute();
		await this.deleteShelfAction.execute({ id: dto.id, assortmentContext: assortments }, currentUser);
	}
}
