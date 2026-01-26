import { DefaultShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import type { ShelfThermometer } from "@/server/modules/warehouse/domain/services/ShelfThermometer";
import type { ShelfRepository } from "@/server/modules/warehouse/domain/repositories/ShelfRepository";
import type { UUIDManager } from "@/server/utils";
import type { GetServicesContext } from "../../context";

export const getDefaultShelfHelper = (ctx: GetServicesContext) => {
	return {
		get: (shelfRepository: ShelfRepository, uuidManager: UUIDManager, shelfThermometer: ShelfThermometer) =>
			new DefaultShelfHelper(shelfRepository, uuidManager, shelfThermometer),
	};
};
