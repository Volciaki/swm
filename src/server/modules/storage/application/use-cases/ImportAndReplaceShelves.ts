import type { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import type { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";
import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { ImportAndReplaceShelvesDTO } from "../dto/ImportAndReplaceShelvesDTO";
import type { CreateShelfDTO } from "../dto/shared/CreateShelfDTO";
import type { ShelfDTO } from "../dto/shared/ShelfDTO";
import type { AssortmentDTO } from "../dto/shared/AssortmentDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import type { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";

export class ImportAndReplaceShelves {
	constructor(
		private readonly getAllShelves: GetAllShelves,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly deleteShelf: DeleteShelf,
		private readonly createShelf: CreateShelf,
		private readonly importShelves: ImportShelves,
		private readonly storageAssortmentHelper: StorageAssortmentHelper,
		private readonly fetchFile: FetchFile
	) {}

	async execute(dto: ImportAndReplaceShelvesDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const currentShelves = await this.getAllShelves.execute();
		const currentAssortment = await this.getAllAssortment.execute();
		const currentFullAssortment: CreateAssortmentDTO[] = await Promise.all(
			currentAssortment.map(async (assortment) => {
				// prettier-ignore
				const imageContentBase64 = assortment.image?.id
					? (
						await this.fetchFile.execute({
							id: assortment.image?.id,
							metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES },
						})
					).base64
					: null;

				return {
					...assortment,
					imageContentBase64,
				};
			})
		);

		try {
			await this.deleteAllAssortment(currentUser);
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
			await this.storageAssortmentHelper.importAndReplaceAssortment({ assortment: currentFullAssortment }, currentUser);

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
			await this.deleteShelf.execute({ id: shelf.id, assortmentContext: assortments }, currentUser, {
				enforceMinimalAmountOfShelves: false,
			});
		}
	}

	private async deleteAllAssortment(currentUser: UserDTO) {
		await this.storageAssortmentHelper.importAndReplaceAssortment({ assortment: [] }, currentUser);
	}
}
