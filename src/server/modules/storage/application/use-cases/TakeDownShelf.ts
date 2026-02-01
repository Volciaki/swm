import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { TakeDownShelfDTO } from "../dto/TakeDownShelfDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import { assortmentDTOsToAssortmentsVOs } from "../utils/AssortmentDTOToAssortmentVO";

export class TakeDownShelf {
	constructor(
		private readonly storageHelper: StorageAssortmentHelper,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelf: GetShelf,
		private readonly deleteShelf: DeleteShelf
	) {}

	async execute(dto: TakeDownShelfDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortments = await this.getAllAssortment.execute();
		const assortmentContext = assortmentDTOsToAssortmentsVOs(assortments);

		const shelf = await this.getShelf.execute({ id: dto.id, assortmentContext });

		const assortmentsIds = shelf.cells
			.flat()
			.map((cell) => cell.assortment?.id)
			.filter((value) => value !== undefined);
		for (const assortmentId of assortmentsIds) {
			await this.storageHelper.takeDownAssortment({ id: assortmentId });
		}

		await this.deleteShelf.execute({ id: dto.id, assortmentContext }, currentUser);
	}
}
