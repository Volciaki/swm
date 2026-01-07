import { UnauthorizedError, UserDTO } from "@/server/utils";
import { ImportAndReplaceAssortmentDTO } from "../dto/ImportAndReplaceAssortmentDTO";
import { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class ImportAndReplaceAssortment {
    constructor(private readonly storageAssortmentHelper: StorageAssortmentHelper) {}
    async execute(dto: ImportAndReplaceAssortmentDTO, currentUser?: UserDTO) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        return await this.storageAssortmentHelper.importAndReplaceAssortment(dto, currentUser);
    }
}
