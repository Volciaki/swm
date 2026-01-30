import { z } from "zod";

export const fetchReportFileByReferenceIdDTOSchema = z.object({
	fileReferenceId: z.string(),
});

export type FetchReportFileByReferenceIdDTO = z.infer<typeof fetchReportFileByReferenceIdDTOSchema>;
