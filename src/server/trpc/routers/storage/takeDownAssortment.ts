import { TakeDownAssortment } from "@/server/modules/storage/application/use-cases/TakeDownAssortment";
import type { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { takeDownAssortmentDTOSchema } from "@/server/modules/storage/application/dto/TakeDownAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const takeDownAssortment = procedure
	.input(takeDownAssortmentDTOSchema)
	.mutation<ShelfDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const storageAssortmentHelper = presets.storageAssortmentHelper.default;

		const action = new TakeDownAssortment(storageAssortmentHelper);
		return await action.execute(input, ctx.user ?? undefined);
	});
