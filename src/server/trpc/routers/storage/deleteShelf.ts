import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { TakeDownShelf } from "@/server/modules/storage/application/use-cases/TakeDownShelf";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { takeDownShelfDTOSchema } from "@/server/modules/storage/application/dto/TakeDownShelfDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const deleteShelf = procedure.input(takeDownShelfDTOSchema).mutation<void>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const temperatureReadingRepository = services.repositories.temperatureReading.db;

	const shelfHelper = presets.shelfHelper.default;
	const fileHelper = presets.fileHelper.default;
	const assortmentFileHelper = presets.assortmentFileHelper.default.get(fileHelper);

	const storageAssortmentHelper = presets.storageAssortmentHelper.default;
	const assortmentDefinitionHelper = presets.assortmentDefinitionHelper.default;
	const assortmentDefinitionUtilities = services.utils.assortmentDefinition.default.get(
		assortmentDefinitionHelper,
		assortmentFileHelper
	);

	const getAllAssortment = new GetAllAssortment(assortmentRepository, assortmentDefinitionUtilities);
	const getShelf = new GetShelf(shelfHelper);
	const deleteShelf = new DeleteShelf(shelfHelper, shelfRepository, temperatureReadingRepository);

	const action = new TakeDownShelf(storageAssortmentHelper, getAllAssortment, getShelf, deleteShelf);
	return await action.execute(input, ctx.user ?? undefined);
});
