import { DeleteFullAssortmentDefinition } from "@/server/modules/storage/application/use-cases/DeleteFullAssortmentDefinition";
import { deleteAssortmentDTOSchema } from "@/server/modules/assortment/application/dto/DeleteAssortmentDTO";
import { getPresets, getServices } from "../../services";
import { procedure } from "../../init";

export const deleteAssortment = procedure.input(deleteAssortmentDTOSchema).mutation<void>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const presets = getPresets(services);

	const storageAssortmentDefinitionHelper = presets.storageAssortmentDefinitionHelper.default;

	const action = new DeleteFullAssortmentDefinition(storageAssortmentDefinitionHelper);
	return await action.execute(input, ctx.user ?? undefined);
});
