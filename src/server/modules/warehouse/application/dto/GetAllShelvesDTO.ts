import { z } from "zod";
import { assortmentContextDTOSchema } from "./shared/AssortmentContextDTO";

export const getAllShelvesDTOSchema = z.object({
	assortmentContext: assortmentContextDTOSchema,
});

export type GetAllShelvesDTO = z.infer<typeof getAllShelvesDTOSchema>;
