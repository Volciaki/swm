import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetExpiredAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentFileHelper.fileGetter);
		const expiredAssortment = assortments.filter((assortment) => assortment.hasExpired);
		return expiredAssortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
