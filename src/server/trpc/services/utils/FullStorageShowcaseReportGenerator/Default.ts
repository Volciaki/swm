import { DefaultFullStorageShowcaseReportGenerator } from "@/server/modules/reporting/infrastructure/services/DefaultFullStorageShowcaseReportGenerator";
import { GetServicesContext } from "../../context";

export const getDefaultFullStorageShowcaseReportGenerator = (ctx: GetServicesContext): DefaultFullStorageShowcaseReportGenerator => {
	return new DefaultFullStorageShowcaseReportGenerator();
}
