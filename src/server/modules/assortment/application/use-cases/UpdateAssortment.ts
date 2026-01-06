import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UserDTO } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { UpdateAssortmentDTO } from "../dto/UpdateAssortmentDTO";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { AssortmentHelper } from "../helpers/AssortmentHelper";

export class UpdateAssortment {
    constructor(
        private readonly assortmentRepository: AssortmentRepository,
        private readonly assortmentHelper: AssortmentHelper,
    ) {}

    async execute(dto: UpdateAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id);
        const newAssortment = AssortmentMapper.fromAssortmentDTOToAssortment({
            ...dto.newData,
            id: dto.id,
            cellId: assortment.cellId.value,
            shelfId: assortment.shelfId.value,
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
