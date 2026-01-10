import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { CreateAssortment } from "@/server/modules/assortment/application/use-cases/CreateAssortment";
import { DeleteAssortment } from "@/server/modules/assortment/application/use-cases/DeleteAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";
import { FillCell } from "@/server/modules/warehouse/application/use-cases/FillCell";
import { EmptyCell } from "@/server/modules/warehouse/application/use-cases/EmptyCell";
import { PutUpAssortment } from "@/server/modules/storage/application/use-cases/PutUpAssortment";
import { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { putUpAssortmentDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const createAssortment = procedure.input(putUpAssortmentDTOSchema).mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
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

	const storageAssortmentHelper = services.helpers.storageAssortment.default.get(
		getAllAssortmentAction,
		getAssortmentAction,
		createAssortmentAction,
		deleteAssortmentAction,
		getShelfAction,
		fillCellAction,
		emptyCellAction,
	);

	const action = new PutUpAssortment(storageAssortmentHelper);
	return await action.execute(input, ctx.user ?? undefined);
});
