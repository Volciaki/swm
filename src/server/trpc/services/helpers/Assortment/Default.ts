import { DefaultAssortmentHelper } from "@/server/modules/assortment/application/helpers/AssortmentHelper";
import { AssortmentRepository } from "@/server/modules/assortment/domain/repositories/AssortmentRepository";
import { UUIDManager } from "@/server/utils";
import { GetServicesContext } from "../../context";

export const getDefaultAssortmentHelper = (ctx: GetServicesContext) => {
    return {
        get: (
            assortmentRepository: AssortmentRepository,
            uuidManager: UUIDManager,
        ) => new DefaultAssortmentHelper(assortmentRepository, uuidManager)
    };
};
