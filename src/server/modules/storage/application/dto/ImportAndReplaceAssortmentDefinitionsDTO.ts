import { z } from "zod";
import { createAssortmentDefinitionDTOSchema } from "./CreateAssortmentDefinitionDTO";

export const importAndReplaceAssortmentDefinitionsDTOSchema = z.object({
	definitions: createAssortmentDefinitionDTOSchema
		.omit({ imageContentBase64: true })
		.extend({ assortmentImageFileReferenceId: z.string().optional() })
		.array(),
});

export type ImportAndReplaceAssortmentDefinitionsDTO = z.infer<typeof importAndReplaceAssortmentDefinitionsDTOSchema>;
