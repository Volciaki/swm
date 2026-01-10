import { z } from "zod";
import { assortmentVOSchema } from "../../domain/vo/AssortmentVO";
import { fullShelfIdentificationDTOSchema } from "./shared/FullShelfIdentificationDTO";

export const fillCellDTOSchema = z.object({
	shelf: fullShelfIdentificationDTOSchema,
	cellId: z.string(),
	assortment: assortmentVOSchema,
});

export type FillCellDTO = z.infer<typeof fillCellDTOSchema>;
