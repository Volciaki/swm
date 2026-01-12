import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import { UpdateFullShelf } from "@/server/modules/storage/application/use-cases/UpdateFullShelf";
import { updateFullShelfDTOSchema } from "@/server/modules/storage/application/dto/UpdateFullShelf";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const updateShelf = procedure.input(updateFullShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;

	const shelfHelper = presets.shelfHelper.default;

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
	const updateShelfAction = new UpdateShelf(shelfHelper, shelfRepository);

	const action = new UpdateFullShelf(getAllAssortmentAction, updateShelfAction);
	return await action.execute(input, ctx.user ?? undefined);
});
