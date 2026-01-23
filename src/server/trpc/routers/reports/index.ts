import { createRouter } from "../../init";

import { generateCloseToExpirationAssortment } from "./generateCloseToExpirationAssortment";
import { generateFullStorageShowcase } from "./generateFullStorageShowcase";
import { generateTemperatureExceededDetails } from "./generateTemperatureExceededDetails";

export const reportsRouter = createRouter({
	generateCloseToExpirationAssortment,
	generateTemperatureExceededDetails,
	generateFullStorageShowcase,
});
