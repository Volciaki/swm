import { z } from "zod";
import { createAssortmentDefinitionDTOSchema } from "./CreateAssortmentDefinitionDTO";

export const importAndReplaceAssortmentDefinitionsDTOSchema = z.object({
	definitions: createAssortmentDefinitionDTOSchema.array(),
});

export type ImportAndReplaceAssortmentDefinitionsDTO = z.infer<typeof importAndReplaceAssortmentDefinitionsDTOSchema>;
