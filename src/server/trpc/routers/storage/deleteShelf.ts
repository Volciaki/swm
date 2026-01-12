import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { TakeDownShelf } from "@/server/modules/storage/application/use-cases/TakeDownShelf";
import { takeDownShelfDTOSchema } from "@/server/modules/storage/application/dto/TakeDownShelfDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const deleteShelf = procedure.input(takeDownShelfDTOSchema).mutation<void>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;

	const shelfHelper = presets.shelfHelper.default;

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
	const deleteShelfAction = new DeleteShelf(shelfHelper, shelfRepository);

	const action = new TakeDownShelf(getAllAssortmentAction, deleteShelfAction);
	return await action.execute(input, ctx.user ?? undefined);
});
