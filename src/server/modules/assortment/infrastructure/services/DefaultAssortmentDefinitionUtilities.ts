import type { UUID } from "@/server/utils";
import type { AssortmentDefinitionUtilities } from "../../application/services/AssortmentDefinitionUtilities";
import type { AssortmentDefinitionHelper } from "../../application/helpers/AssortmentDefinitionHelper";
import type { AssortmentFileHelper } from "../../application/services/AssortmentFileHelper";

export class DefaultAssortmentDefinitionUtilities implements AssortmentDefinitionUtilities {
	constructor(
		private readonly assortmentDefinitionHelper: AssortmentDefinitionHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper
	) {
		this.definitionGetter = this.definitionGetter.bind(this);
	}

	async definitionGetter(id: UUID) {
		const definition = await this.assortmentDefinitionHelper.getByIdStringOrThrow(
			id.value,
			this.assortmentFileHelper.fileGetter
		);
		return definition;
	}
}
