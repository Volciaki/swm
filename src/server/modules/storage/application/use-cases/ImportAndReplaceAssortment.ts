import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { StorageAssortmentDefinitionHelper } from "../helpers/StorageAssortmentDefinitionHelper";
import type { ImportAndReplaceAssortmentDefinitionsDTO } from "../dto/ImportAndReplaceAssortmentDTO";

export class ImportAndReplaceAssortmentDefinitions {
	constructor(private readonly storageAssortmentDefinitionsHelper: StorageAssortmentDefinitionHelper) {}
	async execute(dto: ImportAndReplaceAssortmentDefinitionsDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageAssortmentDefinitionsHelper.importAndReplaceAssortmentDefinitions(dto);
	}
}
