import { z } from "zod";

export const fetchFileResponseDTOSchema = z.object({
	base64: z.string(),
});

export type FetchFileResponseDTO = z.infer<typeof fetchFileResponseDTOSchema>;
