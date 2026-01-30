import { createRouter } from "../../init";

import { generateCloseToExpirationAssortment } from "./generateCloseToExpirationAssortment";
import { generateFullStorageShowcase } from "./generateFullStorageShowcase";
import { generateTemperatureExceededDetails } from "./generateTemperatureExceededDetails";
import { fetchReportFileByReferenceId } from "./fetchReportFileByReferenceId";

export const reportsRouter = createRouter({
	generateCloseToExpirationAssortment,
	generateTemperatureExceededDetails,
	generateFullStorageShowcase,
	fetchReportFileByReferenceId,
});
