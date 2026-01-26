import { DefaultAssortmentHelper } from "@/server/modules/assortment/application/helpers/AssortmentHelper";
import type { AssortmentRepository } from "@/server/modules/assortment/domain/repositories/AssortmentRepository";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultAssortmentHelper = (ctx: GetServicesContext) => {
	return {
		get: (assortmentRepository: AssortmentRepository, uuidManager: UUIDManager) =>
			new DefaultAssortmentHelper(assortmentRepository, uuidManager),
	};
};
