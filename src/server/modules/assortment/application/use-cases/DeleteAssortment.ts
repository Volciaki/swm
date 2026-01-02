import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO, UUID } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { DeleteAssortmentDTO } from "../dto/DeleteAssortmentDTO";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";

export class DeleteAssortment {
    constructor(private readonly assortmentRepository: AssortmentRepository) {}

    async execute(dto: DeleteAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortmentId = UUID.fromString(dto.id);
        const assortment = await this.assortmentRepository.getById(assortmentId);

        if (assortment === null) throw new AssortmentNotFoundError(assortmentId);

        await this.assortmentRepository.delete(assortment);
    }
}
