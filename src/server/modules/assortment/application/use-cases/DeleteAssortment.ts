import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import type { DeleteAssortmentDTO } from "../dto/DeleteAssortmentDTO";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class DeleteAssortment {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentDefinitionsUtilities: AssortmentDefinitionUtilities
	) {}

	async execute(dto: DeleteAssortmentDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentDefinitionsUtilities.definitionGetter
		);
		return await this.assortmentRepository.delete(assortment);
	}
}
