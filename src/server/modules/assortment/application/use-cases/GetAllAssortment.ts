import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";

export class GetAllAssortment {
    constructor(private readonly assortmentRepository: AssortmentRepository) {}

    async execute() {
        const assortments = await this.assortmentRepository.getAll();
        return assortments.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
    }
}
