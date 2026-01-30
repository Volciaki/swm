import type { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const getAllShelves = procedure.query<ShelfDTO[]>(async ({ ctx }) => {
	const services = getServices(ctx);

	const shelfRepository = services.repositories.shelf.db;

	const action = new GetAllShelves(shelfRepository);
	return await action.execute();
});
