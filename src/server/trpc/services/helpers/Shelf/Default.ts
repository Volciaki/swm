import { DefaultShelfHelper } from "@/server/modules/warehouse/application/helpers/ShelfHelper";
import { GetServicesContext } from "../../context";
import { ShelfRepository } from "@/server/modules/warehouse/domain/repositories/ShelfRepository";

export const getDefaultShelfHelper = (ctx: GetServicesContext) => {
    return {
        get: (shelfRepository: ShelfRepository) => new DefaultShelfHelper(shelfRepository)
    };
};
