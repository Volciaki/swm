import { DefaultShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import { ShelfRepository } from "@/server/modules/warehouse/domain/repositories/ShelfRepository";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultShelfHelper = (ctx: GetServicesContext) => {
	return {
		get: (
			shelfRepository: ShelfRepository,
			uuidManager: UUIDManager,
		) => new DefaultShelfHelper(shelfRepository, uuidManager)
	};
};
