import { DefaultAssortmentHelper } from "@/server/modules/assortment/application/helpers/AssortmentHelper";
import { AssortmentRepository } from "@/server/modules/assortment/domain/repositories/AssortmentRepository";
import { GetServicesContext } from "../../context";

export const getDefaultAssortmentHelper = (ctx: GetServicesContext) => {
    return {
        get: (assortmentRepository: AssortmentRepository) => new DefaultAssortmentHelper(assortmentRepository)
    };
};
