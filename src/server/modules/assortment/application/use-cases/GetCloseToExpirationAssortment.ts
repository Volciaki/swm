import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class GetCloseToExpirationAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentDefinitionUtilities.definitionGetter);
		const closeToExpirationAssortment = assortments.filter((assortment) => assortment.isCloseToExpiration);
		return closeToExpirationAssortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
