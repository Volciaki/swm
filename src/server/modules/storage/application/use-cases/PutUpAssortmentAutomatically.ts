import type { UserDTO } from "@/server/utils";
import { assortmentDTOsToAssortmentVOs, UnauthorizedError } from "@/server/utils";
import type { GetAssortmentDefinition } from "@/server/modules/assortment/application/use-cases/GetAssortmentDefinition";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import type { PutUpAssortmentAutomaticallyDTO } from "../dto/PutUpAssortmentAutomaticallyDTO";
import { AssortmentNoSpaceError } from "../errors/AssortmentNoSpaceError";

const formatErrorDetails = (details: string[]): string => {
	const dashedDetails = details.map((detail) => `- ${detail}`);
	const joinedDetails = dashedDetails.join(",\n");
	return `\n\n${joinedDetails}`;
};

export class PutUpAssortmentAutomatically {
	constructor(
		private readonly getAssortmentDefinition: GetAssortmentDefinition,
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getAllShelves: GetAllShelves,
		private readonly storageHelper: StorageAssortmentHelper
	) {}

	async execute(dto: PutUpAssortmentAutomaticallyDTO, currentUser?: UserDTO) {
		if (!currentUser) throw new UnauthorizedError();

		const definition = await this.getAssortmentDefinition.execute(
			{ id: dto.definitionId },
			{ skipAuthentication: true }
		);
		const allAssortment = await this.getAllAssortment.execute();
		const shelves = await this.getAllShelves.execute({
			assortmentContext: assortmentDTOsToAssortmentVOs(allAssortment),
		});

		const errorDetails: string[] = [];
		for (const shelf of shelves) {
			const emptyCells = shelf.cells.flat().filter((cell) => cell.assortment === null);

			if (emptyCells.length === 0) continue;

			const cell = emptyCells[0];

			try {
				return await this.storageHelper.putUpAssortment(
					{
						shelfId: shelf.id,
						cellId: cell.id,
						assortmentDefinitionId: definition.id,
					},
					currentUser
				);
			} catch (err) {
				const error = err as Error;
				errorDetails.push(`Shelf: ${shelf.id}, Cell: ${cell.id}, Error: ${error.name} - ${error.message}`);
				continue;
			}
		}

		throw new AssortmentNoSpaceError({ details: formatErrorDetails(errorDetails) });
	}
}
