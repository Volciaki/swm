import type { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { GetFullShelf } from "@/server/modules/storage/application/use-cases/GetFullShelf";
import { getFullShelfDTOSchema } from "@/server/modules/storage/application/dto/GetFullShelfDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getShelf = procedure.input(getFullShelfDTOSchema).query<ShelfDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;

	const shelfHelper = presets.shelfHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository, assortmentFileHelper);
	const getShelfAction = new GetShelf(shelfHelper);

	const action = new GetFullShelf(getAllAssortmentAction, getShelfAction);
	return await action.execute(input);
});
