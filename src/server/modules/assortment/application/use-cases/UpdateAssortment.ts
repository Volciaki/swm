import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO, UUID } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";
import { UpdateAssortmentDTO } from "../dto/UpdateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";

export class UpdateAssortment {
    constructor(private readonly assortmentRepository: AssortmentRepository) {}

    async execute(dto: UpdateAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortmentId = UUID.fromString(dto.id);
        const assortment = await this.assortmentRepository.getById(assortmentId);

        if (assortment === null) throw new AssortmentNotFoundError(assortmentId);

        const newAssortment = AssortmentMapper.fromAssortmentDTOToAssortment({
            ...dto.newData,
            id: dto.id,
            storedAtTimestamp: assortment.storedAt.getTime(),
        });

        const { weight, size, expiresAfter, isHazardous, name, temperatureRange, comment } = newAssortment;
        assortment.weight = weight;
        assortment.size = size;
        assortment.expiresAfter = expiresAfter;
        assortment.isHazardous = isHazardous;
        assortment.name = name;
        assortment.temperatureRange = temperatureRange;
        assortment.comment = comment;
        await this.assortmentRepository.update(assortment);

        return AssortmentMapper.fromAssortmentToAssortmentDTO(assortment);
    }
}
