import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { StorageAssortmentDefinitionHelper } from "../helpers/StorageAssortmentDefinitionHelper";
import type { DeleteAssortmentDefinitionDTO } from "../dto/DeleteAssortmentDefinitionDTO";

export class DeleteFullAssortmentDefinition {
	constructor(private readonly storageAssortmentDefinitionHelper: StorageAssortmentDefinitionHelper) {}

	async execute(dto: DeleteAssortmentDefinitionDTO, currentUser?: UserDTO): Promise<void> {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageAssortmentDefinitionHelper.deleteAssortmentDefinitionByDTO(dto);
	}
}
