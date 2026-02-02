import { PutUpAssortment } from "@/server/modules/storage/application/use-cases/PutUpAssortment";
import type { PutUpAssortmentResponseDTO } from "@/server/modules/storage/application/dto/PutUpAssortmentResponseDTO";
import { putUpAssortmentDTOSchema } from "@/server/modules/storage/application/dto/PutUpAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const putUpAssortment = procedure
	.input(putUpAssortmentDTOSchema)
	.mutation<PutUpAssortmentResponseDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);
		const presets = getPresets(services);

		const storageAssortmentHelper = presets.storageAssortmentHelper.default;

		const action = new PutUpAssortment(storageAssortmentHelper);
		return await action.execute(input, ctx.user ?? undefined);
	});
