import type { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { ImportAndReplaceShelvesDTO } from "../dto/ImportAndReplaceShelvesDTO";
import type { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import type { ShelfDTO } from "../dto/shared/ShelfDTO";
import type { AssortmentDTO } from "../dto/shared/AssortmentDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import { assortmentDTOsToAssortmentsVOs } from "../utils/AssortmentDTOToAssortmentVO";

export class ImportAndReplaceShelves {
	constructor(
		private readonly getAllShelves: GetAllShelves,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly deleteShelf: DeleteShelf,
		private readonly createShelf: CreateShelf,
		private readonly importShelves: ImportShelves,
		private readonly storageAssortmentHelper: StorageAssortmentHelper
	) {}

	async execute(dto: ImportAndReplaceShelvesDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const currentShelves = await this.getAllShelves.execute();
		const currentAssortment = await this.getAllAssortment.execute();

		try {
			await this.deleteAssortments(currentAssortment);
			await this.deleteShelves(currentShelves, currentAssortment, currentUser);
			const createdShelves = await this.importShelves.execute(dto, currentUser);
			return createdShelves;
		} catch (error) {
			// Attempt to rollback the changes if an error occurred.
			const createCurrentShelveDTOs = currentShelves.map((shelf) => ({
				...shelf,
				cells: undefined,
				cellsShape: {
					rows: shelf.cells.length,
					columns: shelf.cells[0].length,
				},
			}));
			await this.createShelves(createCurrentShelveDTOs, currentUser);
			await this.createAssortments(currentAssortment);

			throw error;
		}
	}

	private async createShelves(shelves: CreateShelfDTO[], currentUser: UserDTO) {
		for (const shelf of shelves) {
			await this.createShelf.execute(shelf, currentUser);
		}
	}

	private async deleteShelves(shelves: ShelfDTO[], assortments: AssortmentDTO[], currentUser: UserDTO) {
		for (const shelf of shelves) {
			await this.deleteShelf.execute(
				{ id: shelf.id, assortmentContext: assortmentDTOsToAssortmentsVOs(assortments) },
				currentUser,
				{
					enforceMinimalAmountOfShelves: false,
				}
			);
		}
	}

	private async deleteAssortments(assortments: AssortmentDTO[]) {
		for (const assortment of assortments) {
			await this.storageAssortmentHelper.takeDownAssortment(assortment);
		}
	}

	private async createAssortments(assortments: AssortmentDTO[]) {
		for (const assortment of assortments) {
			await this.storageAssortmentHelper.putUpAssortment({
				assortmentDefinitionId: assortment.definition.id,
				cellId: assortment.cellId,
				shelfId: assortment.shelfId,
			});
		}
	}
}
