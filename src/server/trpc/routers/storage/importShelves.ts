import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { ImportShelves } from "@/server/modules/warehouse/application/use-cases/ImportShelves";
import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { ImportAndReplaceShelves } from "@/server/modules/storage/application/use-cases/ImportAndReplaceShelves";
import { importAndReplaceShelvesDTOSchema } from "@/server/modules/storage/application/dto/ImportAndReplaceShelvesDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const importShelves = procedure.input(importAndReplaceShelvesDTOSchema).mutation<ShelfDTO[]>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfRepository = services.repositories.shelf.db;
	const assortmentRepository = services.repositories.assortment.db;

	const shelfHelper = presets.shelfHelper.default;

	const getAllShelvesAction = new GetAllShelves(shelfRepository);
	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
	const deleteShelfAction = new DeleteShelf(shelfHelper, shelfRepository);
	const importShelvesAction = new ImportShelves(shelfHelper);
	const createShelfAction = new CreateShelf(shelfHelper);

	const storageAssortmentHelper = presets.storageAssortmentHelper.default;

	const action = new ImportAndReplaceShelves(
		getAllShelvesAction,
		getAllAssortmentAction,
		deleteShelfAction,
		createShelfAction,
		importShelvesAction,
		storageAssortmentHelper,
	);
	return await action.execute(input, ctx.user ?? undefined);
});
