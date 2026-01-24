import { Services } from "../get";

import { getAssortmentFileHelperPresets } from "./AssortmentFileHelper";
import { getAssortmentHelperPresets } from "./AssortmentHelper";
import { getFileHelperPresets } from "./FileHelper";
import { getFileManagerPresets } from "./FileManager";
import { getReportHelperPresets } from "./ReportHelper";
import { getShelfHelperPresets } from "./ShelfHelper";
import { getStorageAssortmentHelperPresets } from "./StorageAssortmentHelper";

// If you'll find yourself oftentimes creating a service with the same exact dependencies you can add it here, to avoid code duplication.
export const getPresets = (services: Services) => {
	return {
		assortmentHelper: getAssortmentHelperPresets(services),
		storageAssortmentHelper: getStorageAssortmentHelperPresets(services),
		shelfHelper: getShelfHelperPresets(services),
		fileHelper: getFileHelperPresets(services),
		assortmentFileHelper: getAssortmentFileHelperPresets(services),
		fileManager: getFileManagerPresets(services),
		reportHelper: getReportHelperPresets(services),
	};
};

export type Presets = ReturnType<typeof getPresets>;
