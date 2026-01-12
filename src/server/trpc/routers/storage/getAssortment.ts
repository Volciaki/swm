import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { getAssortmentDTOSchema } from "@/server/modules/assortment/application/dto/GetAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const getAssortment = procedure.input(getAssortmentDTOSchema).query<AssortmentDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const assortmentHelper = presets.assortmentHelper.default;

	const action = new GetAssortment(assortmentHelper);
	return await action.execute(input);
});
