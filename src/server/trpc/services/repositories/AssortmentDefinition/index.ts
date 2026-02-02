import type { GetServicesContext } from "../../context";
import { getDBAssortmentDefinitionRepository } from "./DB";

export const getAssortmentDefinitionRepositories = (ctx: GetServicesContext) => {
	return {
		db: getDBAssortmentDefinitionRepository(ctx),
	};
};
