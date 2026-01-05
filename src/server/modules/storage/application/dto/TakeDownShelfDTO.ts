import z from "zod";

export const takeDownShelfDTOSchema = z.object({
    shelfId: z.string(),
});

export type TakeDownShelfDTO = z.infer<typeof takeDownShelfDTOSchema>;
