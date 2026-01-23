import { DefaultShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import { ShelfThermometer } from "@/server/modules/warehouse/domain/services/ShelfThermometer";
import { ShelfRepository } from "@/server/modules/warehouse/domain/repositories/ShelfRepository";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultShelfHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			shelfRepository: ShelfRepository,
			uuidManager: UUIDManager,
			shelfThermometer: ShelfThermometer,
		) => new DefaultShelfHelper(shelfRepository, uuidManager, shelfThermometer)
	};
};
