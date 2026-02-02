import type { UserDTO } from "@/server/utils";
import { UnauthorizedError } from "@/server/utils";
import type { CreateAssortmentDefinitionDTO } from "../dto/CreateAssortmentDefinitionDTO";
import type { AssortmentDefinitionDTO } from "../dto/shared/AssortmentDefinitionDTO";
import type { StorageAssortmentDefinitionHelper } from "../helpers/StorageAssortmentDefinitionHelper";

export class CreateFullAssortmentDefinition {
	constructor(private readonly storageAssortmentDefinitionHelper: StorageAssortmentDefinitionHelper) {}

	async execute(dto: CreateAssortmentDefinitionDTO, currentUser?: UserDTO): Promise<AssortmentDefinitionDTO> {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		return await this.storageAssortmentDefinitionHelper.createAssortmentDefinitionByDTO(dto);
	}
}
