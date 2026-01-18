import { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import { PutUpAssortmentCopyDTO } from "../dto/PutUpAssortmentCopyDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { FetchFile } from "@/server/utils/files/application/use-cases/FetchFile";
import { ShelfDTO } from "../dto/shared/ShelfDTO";
import { CellDTO } from "../dto/shared/CellDTO";
import { AssortmentNoSpaceError } from "../errors/AssortmentNoSpaceError";
import { S3FileStorageBucket } from "@/server/utils/files/infrastructure/persistence/S3FileStorage";

const findEmptyCells = (shelf: ShelfDTO): CellDTO[] => {
	const emptyCells: CellDTO[] = [];
	for (const cellRow of shelf.cells) {
		cellRow.map((cell) => {
			if (cell.assortment === null) emptyCells.push(cell);
		});
	}

	return emptyCells;
};

const formatErrorDetails = (details: string[]): string => {
	const dashedDetails = details.map((detail) => `- ${detail}`);
	const joinedDetails = dashedDetails.join(",\n");
	return `\n\n${joinedDetails}`;
};

// Stores another Assortment of a kind by ID. With this action you can easily duplicate assortments.
export class PutUpAssortmentCopy {
	constructor(
		private readonly storageHelper: StorageAssortmentHelper,
		private readonly getAssortmentAction: GetAssortment,
		private readonly getAllShelvesAction: GetAllShelves,
		private readonly getAllAssortmentAction: GetAllAssortment,
		private readonly fetchFileAssortmentImages: FetchFile,
	) { }

	async execute(dto: PutUpAssortmentCopyDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.getAssortmentAction.execute({ id: dto.id });
		const { weightKg, name, size, comment, isHazardous, temperatureRange, expiresAfterSeconds, image } = assortment;
		const imageContentBase64 = image?.id
			? (await this.fetchFileAssortmentImages.execute(
				{
					id: image.id,
					metadata: { bucket: S3FileStorageBucket.ASSORTMENT_IMAGES }
				},
				currentUser
			)).base64
			: null;
		const sharedData = {
			weightKg,
			name,
			size,
			comment,
			isHazardous,
			temperatureRange,
			expiresAfterSeconds,
			imageContentBase64,
		};

		const assortments = await this.getAllAssortmentAction.execute();
		const shelves = await this.getAllShelvesAction.execute({ assortmentContext: assortments });
		const errorDetails: string[] = [];
		for (const shelf of shelves) {
			const emptyCells = findEmptyCells(shelf);

			if (emptyCells.length === 0) continue;

			const cell = emptyCells[0];

			try {
				return await this.storageHelper.putUpAssortmentByDTO(
					{
						shelfId: shelf.id,
						cellId: cell.id,
						assortment: {
							...sharedData,
							hasExpired: false,
							hasExpiredNotification: null,
							isCloseToExpiration: false,
							isCloseToExpirationNotification: null,
						},
					},
					currentUser,
				);
			} catch (err) {
				const error = err as Error;
				errorDetails.push(`Shelf: ${shelf.id}, Cell: ${cell.id}, Error: ${error.name} - ${error.message}`);
				continue;
			}
		}

		throw new AssortmentNoSpaceError(formatErrorDetails(errorDetails));
	}
}
