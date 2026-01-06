import { UnauthorizedError, UserDTO } from "@/server/utils";
import { AssortmentMapper } from "../../infrastructure/mappers/AssortmentMapper";
import { ImportAssortmentDTO } from "../dto/ImportAssortmentDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";

export class ImportAssortment {
    constructor(private readonly assortmentHelper: AssortmentHelper) {}

    async execute(dto: ImportAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const assortment = await Promise.all(
            dto.assortment.map(async (dtoObject) => await this.assortmentHelper.createByDTO(dtoObject))
        );
        return assortment.map((assortment) => AssortmentMapper.fromAssortmentToAssortmentDTO(assortment));
    }
}
