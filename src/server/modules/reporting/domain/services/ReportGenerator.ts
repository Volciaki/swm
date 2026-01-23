import { Base64 } from "@/server/utils/base64";
import { ReportType } from "../entities/Report";

export type GeneratedReport<T extends ReportType = ReportType> = {
	metadata: { type: T };
	content: Base64;
};

export interface ReportGenerator<T extends ReportType> {
	generate(): Promise<GeneratedReport<T>>;
};

export type CloseToExpirationAssortmentReportGenerator = ReportGenerator<ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT>;
export type TemperatureExceededDetailsReportGenerator = ReportGenerator<ReportType.TEMPERATURE_EXCEEDED_DETAILS>;
export type FullStorageShowcaseReportGenerator = ReportGenerator<ReportType.FULL_STORAGE_SHOWCASE>;
