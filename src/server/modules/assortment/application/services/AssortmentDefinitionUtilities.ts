import type { UUID } from "@/server/utils";
import type { AssortmentDefinition } from "../../domain/entities/AssortmentDefinition";

export interface AssortmentDefinitionUtilities {
	definitionGetter(id: UUID): Promise<AssortmentDefinition>;
}
