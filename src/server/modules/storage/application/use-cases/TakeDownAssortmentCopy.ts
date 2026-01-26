import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import type { TakeDownAssortmentCopyDTO } from "../dto/TakeDownAssortmentCopyDTO";
import type { AssortmentDTO } from "../dto/shared/AssortmentDTO";

const isAlikeAssortment = (a: AssortmentDTO, b: AssortmentDTO): boolean => {
	if (a.size.lengthMillimeters !== b.size.lengthMillimeters) return false;
	if (a.size.widthMillimeters !== b.size.widthMillimeters) return false;
	if (a.size.heightMillimeters !== b.size.heightMillimeters) return false;
	if (a.weightKg !== b.weightKg) return false;
	if (a.isHazardous !== b.isHazardous) return false;
	if (a.temperatureRange.minimalCelsius !== b.temperatureRange.minimalCelsius) return false;
	if (a.temperatureRange.maximalCelsius !== b.temperatureRange.maximalCelsius) return false;
	if (a.expiresAfterSeconds !== b.expiresAfterSeconds) return false;

	return true;
};

const findAlikeAssortment = (originalAssortment: AssortmentDTO, allAssortments: AssortmentDTO[]): AssortmentDTO[] => {
	const similarAssortment = [];

	for (const assortment of allAssortments) {
		if (isAlikeAssortment(assortment, originalAssortment)) similarAssortment.push(assortment);
	}

	return similarAssortment;
};

export class TakeDownAssortmentCopy {
	constructor(
		private readonly storageHelper: StorageAssortmentHelper,
		private readonly getAssortmentAction: GetAssortment,
		private readonly getAllAssortmentAction: GetAllAssortment
	) {}

	async execute(dto: TakeDownAssortmentCopyDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.getAssortmentAction.execute({ id: dto.id });
		const allAssortments = await this.getAllAssortmentAction.execute();

		const similarAssortment = findAlikeAssortment(assortment, allAssortments);
		// By oldest to newest.
		const sortedSimilarAssortment = [...similarAssortment].sort(
			(a, b) => new Date(a.storedAtTimestamp).getTime() - new Date(b.storedAtTimestamp).getTime()
		);

		let oldest;
		oldest = sortedSimilarAssortment[0];
		// If possible, don't delete the assortment which we've just scanned.
		if (oldest.id === assortment.id && sortedSimilarAssortment.length > 1) oldest = sortedSimilarAssortment[1];

		await this.storageHelper.takeDownAssortmentByDTO(oldest, currentUser);

		return await this.getAllAssortmentAction.execute();
	}
}
