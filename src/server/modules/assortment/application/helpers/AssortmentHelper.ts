import { UUID, UUIDManager } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";
import { CreateAssortmentDTO } from "../dto/shared/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";

export interface AssortmentHelper {
    getByIdStringOrThrow(id: string): Promise<Assortment>;
    createByDTO(dto: CreateAssortmentDTO): Promise<Assortment>;
};

export class DefaultAssortmentHelper implements AssortmentHelper {
	constructor(
        private readonly assortmentRepository: AssortmentRepository,
        private readonly uuidManager: UUIDManager,
	) {}

	async getByIdStringOrThrow(id: string) {
		const assortmentId = UUID.fromString(id);
		const assortment = await this.assortmentRepository.getById(assortmentId);

		if (assortment === null) throw new AssortmentNotFoundError(assortmentId);

		return assortment;
	}

	async createByDTO(dto: CreateAssortmentDTO) {
		const assortment = AssortmentMapper.fromAssortmentDTOToAssortment({
			...dto,
			id: this.uuidManager.generate().value,
			storedAtTimestamp: (new Date()).getTime(),
		});
		await this.assortmentRepository.create(assortment);
		return assortment;
	}
}
