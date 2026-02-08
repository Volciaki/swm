import { UnauthorizedError, type UserDTO } from "@/server/utils";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { AssortmentFIFOQueueManager } from "../../infrastructure/services/AssortmentFIFOQueueManager";
import type { GetNextAssortmentToBeTakenDownByDefinitionDTO } from "../dto/GetNextAssortmentToBeTakenDownByDefinitionDTO";

export class GetNextAssortmentToBeTakenDownByDefinition {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly assortmentFIFOQueueManager: AssortmentFIFOQueueManager
	) {}

	async execute(dto: GetNextAssortmentToBeTakenDownByDefinitionDTO, currentUser?: UserDTO) {
		if (!currentUser) throw new UnauthorizedError();

		const allAssortments = await this.getAllAssortment.execute();
		const assortmentsWithPassedDefinition = allAssortments.filter((a) => a.definition.id === dto.definitionId);

		const oldestAssortment = await this.assortmentFIFOQueueManager.getSingleOldest(assortmentsWithPassedDefinition);
		return oldestAssortment;
	}
}
