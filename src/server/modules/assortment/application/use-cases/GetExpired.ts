import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class GetExpiredAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentDefinitionUtilities.definitionGetter);
		const expiredAssortment = assortments.filter((assortment) => assortment.hasExpired);
		return expiredAssortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
