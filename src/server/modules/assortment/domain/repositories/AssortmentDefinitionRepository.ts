import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { UUID } from "@/server/utils";
import type { AssortmentDefinition } from "../entities/AssortmentDefinition";

export interface AssortmentDefinitionRepository {
	create(definition: AssortmentDefinition): Promise<void>;
	update(definition: AssortmentDefinition): Promise<void>;
	delete(definition: AssortmentDefinition): Promise<void>;
	getById(id: UUID, getFileContextById: FileContextByIDGetter): Promise<AssortmentDefinition | null>;
	getAll(getFileContextById: FileContextByIDGetter): Promise<AssortmentDefinition[]>;
}
