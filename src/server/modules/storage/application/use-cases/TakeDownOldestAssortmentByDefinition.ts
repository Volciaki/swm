import { UnauthorizedError, type UserDTO } from "@/server/utils";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { TakeDownOldestAssortmentByDefinitionDTO } from "../dto/TakeDownOldestAssortmentByDefinitionDTO";
import type { AssortmentFIFOQueueManager } from "../../infrastructure/services/AssortmentFIFOQueueManager";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";
import { NoAssortmentToTakeDownError } from "../errors/NoAssortmentToTakeDownError";

export class TakeDownOldestAssortmentByDefinition {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly assortmentFIFOQueueManager: AssortmentFIFOQueueManager,
		private readonly storageAssortmentHelper: StorageAssortmentHelper
	) {}

	async execute(dto: TakeDownOldestAssortmentByDefinitionDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const allAssortments = await this.getAllAssortment.execute();
		const assortmentsWithPassedDefinition = allAssortments.filter((a) => a.definition.id === dto.definitionId);

		const oldestAssortment = await this.assortmentFIFOQueueManager.getSingleOldest(assortmentsWithPassedDefinition);

		if (!oldestAssortment) throw new NoAssortmentToTakeDownError({ definitionId: dto.definitionId });

		return await this.storageAssortmentHelper.takeDownAssortment(oldestAssortment);
	}
}
