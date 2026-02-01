import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class GetAllAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentDefinitionUtilities.definitionGetter);
		return assortments.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
