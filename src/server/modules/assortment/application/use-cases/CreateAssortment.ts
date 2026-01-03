import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO, UUIDManager } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { CreateAssortmentDTO } from "../dto/CreateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";

export class CreateAssortment {
    constructor(
        private readonly assortmentRepository: AssortmentRepository,
        private readonly uuidManager: UUIDManager,
    ) {}

    async execute(dto: CreateAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = AssortmentMapper.fromAssortmentDTOToAssortment({
            id: this.uuidManager.generate().value,
            ...dto,
        });
        await this.assortmentRepository.create(assortment);
        return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
    }
}
