import { z } from "zod";
import { assortmentContextDTOSchema } from "./AssortmentContextDTO";

// All data required to fully hydrate a Shelf in this module.
export const fullShelfIdentificationDTOSchema = z.object({
    id: z.string(),
    assortmentContext: assortmentContextDTOSchema,
});
