import { z } from "zod";
import { createAssortmentDefinitionDTOSchema } from "./shared/CreateAssortmentDefinitionDTO";

export const importAssortmentDefinitionsDTOSchema = z.object({
	definitions: createAssortmentDefinitionDTOSchema.array(),
});

export type ImportAssortmentDefinitionsDTO = z.infer<typeof importAssortmentDefinitionsDTOSchema>;
