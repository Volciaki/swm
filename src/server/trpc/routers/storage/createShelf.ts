import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { createShelfDTOSchema } from "@/server/modules/warehouse/application/dto/shared/CreateShelfDTO";
import { procedure } from "../../init";
import { getPresets, getServices } from "../../services";

export const createShelf = procedure.input(createShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const shelfHelper = presets.shelfHelper.default;

	const action = new CreateShelf(shelfHelper);
	return await action.execute(input, ctx.user ?? undefined);
});
