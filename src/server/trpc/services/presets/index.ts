import { Services } from "../get";
import { getAssortmentHelperPresets } from "./AssortmentHelper";
import { getShelfHelperPresets } from "./ShelfHelper";
import { getStorageAssortmentHelperPresets } from "./StorageAssortmentHelper";

// If you'll find yourself oftentimes creating a service with the same exact dependencies you can add it here, to avoid code duplication.
export const getPresets = (services: Services) => {
	return {
		assortmentHelper: getAssortmentHelperPresets(services),
		storageAssortmentHelper: getStorageAssortmentHelperPresets(services),
		shelfHelper: getShelfHelperPresets(services),
	};
};

export type Presets = ReturnType<typeof getPresets>;
