import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { PutUpAssortmentCopy } from "@/server/modules/storage/application/use-cases/PutUpAssortmentCopy";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { putUpAssortmentCopyDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentCopyDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const createAssortmentCopy = procedure.input(putUpAssortmentCopyDTOSchema).mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const assortmentRepository = services.repositories.assortment.db;
	const shelfRepository = services.repositories.shelf.db;
	const uuidManager = services.utils.uuidManager.default;

	const shelfHelper = services.helpers.shelf.default.get(shelfRepository, uuidManager);
	const assortmentHelper = services.helpers.assortment.default.get(assortmentRepository, uuidManager);

	const getAllAssortmentAction = new GetAllAssortment(assortmentRepository);
	const getAssortmentAction = new GetAssortment(assortmentHelper);
	const createAssortmentAction = new CreateAssortment(assortmentHelper);
	const deleteAssortmentAction = new DeleteAssortment(assortmentRepository, assortmentHelper);
	const getShelfAction = new GetShelf(shelfHelper);
	const fillCellAction = new FillCell(shelfRepository, shelfHelper);
	const emptyCellAction = new EmptyCell(shelfRepository, shelfHelper);
	const getAllShelvesAction = new GetAllShelves(shelfRepository);

	const storageAssortmentHelper = services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction,
	);

	const action = new PutUpAssortmentCopy(storageAssortmentHelper, getAssortmentAction, getAllShelvesAction);
	return await action.execute(input, ctx.user ?? undefined);
});
