import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { DefaultStorageShelfHelper } from "@/server/modules/storage/application/helpers/StorageShelfHelper";
import type { GetServicesContext } from "../../context";

export const getDefaultStorageShelfHelper = (ctx: GetServicesContext) => {
	return {
		get: (getAllAssortment: GetAllAssortment, getShelf: GetShelf) =>
			new DefaultStorageShelfHelper(getAllAssortment, getShelf),
	};
};
