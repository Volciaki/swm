import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetAllAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentFileHelper.fileGetter);
		return assortments.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
