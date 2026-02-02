import type { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import type { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import type { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { UUID, assortmentDTOsToAssortmentVOs, assortmentDTOToAssortmentVO } from "@/server/utils";
import type { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import type { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { AssortmentNoCellError } from "../errors/AssortmentNoCellError";
import type { ShelfDTO } from "../dto/shared/ShelfDTO";
import { CellAlreadyTakenError } from "../errors/CellAlreadyTakenError";
import type { TakeDownAssortmentDTO } from "../dto/TakeDownAssortmentDTO";
import type { PutUpAssortmentDTO } from "../dto/PutUpAssortmentDTO";
import type { PutUpAssortmentResponseDTO } from "../dto/PutUpAssortmentResponseDTO";
import { logger } from "@/server/logger";

export interface StorageAssortmentHelper {
	putUpAssortment(dto: PutUpAssortmentDTO): Promise<PutUpAssortmentResponseDTO>;
	takeDownAssortment(dto: TakeDownAssortmentDTO): Promise<ShelfDTO>;
}

export class DefaultStorageAssortmentHelper implements StorageAssortmentHelper {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getAssortment: GetAssortment,
		private readonly createAssortment: CreateAssortment,
		private readonly deleteAssortment: DeleteAssortment,
		private readonly getShelf: GetShelf,
		private readonly fillCell: FillCell,
		private readonly emptyCell: EmptyCell
	) {}

	async putUpAssortment(dto: PutUpAssortmentDTO) {
		let assortments;
		let assortmentContext;

		assortments = await this.getAllAssortment.execute();
		assortmentContext = assortmentDTOsToAssortmentVOs(assortments);
		const shelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext });

		const cellId = UUID.fromString(dto.cellId);
		const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === cellId.value);
		if (cellToUpdate?.assortment !== null && cellToUpdate?.assortment !== undefined)
			throw new CellAlreadyTakenError({ id: cellId.value });

		const assortment = await this.createAssortment.execute({
			definitionId: dto.assortmentDefinitionId,
			cellId: dto.cellId,
			shelfId: dto.shelfId,
		});

		assortments = await this.getAllAssortment.execute();
		assortmentContext = assortmentDTOsToAssortmentVOs(assortments);

		logger.debug("hello???");

		try {
			await this.fillCell.execute(
				{
					shelf: {
						id: dto.shelfId,
						assortmentContext,
					},
					cellId: dto.cellId,
					assortment: assortmentDTOToAssortmentVO(assortment),
				},
				{ skipAuthentication: true }
			);
		} catch (error) {
			await this.deleteAssortment.execute(assortment);

			throw error;
		}

		assortments = await this.getAllAssortment.execute();
		assortmentContext = assortmentDTOsToAssortmentVOs(assortments);
		const newShelf = await this.getShelf.execute({ id: dto.shelfId, assortmentContext });
		return {
			shelf: newShelf,
			newAssortment: assortment,
		};
	}

	async takeDownAssortment(dto: TakeDownAssortmentDTO) {
		const assortment = await this.getAssortment.execute({ id: dto.id });

		const assortments = await this.getAllAssortment.execute();
		const shelf = await this.getShelf.execute({
			id: assortment.shelfId,
			assortmentContext: assortmentDTOsToAssortmentVOs(assortments),
		});

		const cellToUpdate = shelf.cells.flat().find((cell) => cell.id === assortment.cellId);

		if (!cellToUpdate) throw new AssortmentNoCellError({ assortmentId: assortment.id, cellId: assortment.cellId });

		if (cellToUpdate.assortment === null) return shelf;

		cellToUpdate.assortment = null;
		await this.deleteAssortment.execute(assortment);
		const newAssortments = await this.getAllAssortment.execute();
		return await this.emptyCell.execute(
			{
				cellId: cellToUpdate.id,
				shelf: {
					id: cellToUpdate.shelfId,
					assortmentContext: assortmentDTOsToAssortmentVOs(newAssortments),
				},
			},
			{ skipAuthentication: true }
		);
	}
}
