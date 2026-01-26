import type { z } from "zod";
import { reportDTOSchema } from "./shared/ReportDTO";

export const generateCloseToExpirationAssortmentReportResponseDTOSchema = reportDTOSchema;

export type GenerateCloseToExpirationAssortmentReportResponseDTO = z.infer<
	typeof generateCloseToExpirationAssortmentReportResponseDTOSchema
>;
