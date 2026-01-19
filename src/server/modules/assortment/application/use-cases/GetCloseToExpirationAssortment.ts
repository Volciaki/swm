import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class GetCloseToExpirationAssortment {
	constructor(
		private readonly assortmentRepository: AssortmentRepository,
		private readonly assortmentFileHelper: AssortmentFileHelper,
	) {}

	async execute() {
		const assortments = await this.assortmentRepository.getAll(this.assortmentFileHelper.fileGetter);
		const closeToExpirationAssortment = assortments.filter((assortment) => assortment.isCloseToExpiration);
		return closeToExpirationAssortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
	}
}
