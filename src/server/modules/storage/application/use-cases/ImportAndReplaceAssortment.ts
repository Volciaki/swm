import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { ImportAssortment } from "@/server/modules/assortment/application/use-cases/ImportAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { ImportAndReplaceAssortmentDTO } from "../dto/ImportAndReplaceAssortmentDTO";
import { UnauthorizedError, UserDTO } from "@/server/utils";

export class ImportAndReplaceAssortment {
    constructor(
        private readonly getAllAssortment: GetAllAssortment,
        private readonly deleteAssortment: DeleteAssortment,
        private readonly importAssortmentAction: ImportAssortment,
    ) {}

    async execute(dto: ImportAndReplaceAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const currentAssortment = await this.getAllAssortment.execute();
        for (const assortment of currentAssortment) {
            await this.deleteAssortment.execute({ id: assortment.id }, currentUser);
        }

        return await this.importAssortmentAction.execute({ assortment: dto.assortment }, currentUser);
    }
}
