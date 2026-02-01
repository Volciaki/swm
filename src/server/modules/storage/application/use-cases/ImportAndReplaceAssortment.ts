import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { ImportAndReplaceAssortmentDTO } from "../dto/ImportAndReplaceAssortmentDTO";
import type { StorageAssortmentHelper } from "../helpers/StorageAssortmentHelper";

export class ImportAndReplaceAssortmentDefinitions {
	constructor(private readonly storageAssortmentDefinitionsHelper: StorageAssortmentDef) {}
	async execute(dto: ImportAndReplaceAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageAssortmentHelper.importAndReplaceAssortment(dto, currentUser);
	}
}
