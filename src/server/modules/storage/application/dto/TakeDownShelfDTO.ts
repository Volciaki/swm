import z from "zod";

export const takeDownShelfDTOSchema = z.object({
    id: z.string(),
});

export type TakeDownShelfDTO = z.infer<typeof takeDownShelfDTOSchema>;
