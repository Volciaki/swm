import { DBAssortmentDefinitionRepository } from "@/server/modules/assortment/infrastructure/persistence/DBAssortmentDefinitionRepository";
import { DBAssortmentDefinition } from "@/server/modules/assortment/infrastructure/entities/DBAssortmentDefinition";
import type { GetServicesContext } from "../../context";

export const getDBAssortmentDefinitionRepository = (ctx: GetServicesContext): DBAssortmentDefinitionRepository => {
	return new DBAssortmentDefinitionRepository(ctx.db.getRepository(DBAssortmentDefinition));
};
