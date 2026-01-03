import { GetServicesContext } from "../context";
import { getAssortmentHelperServices } from "./Assortment";
import { getShelfHelperServices } from "./Shelf";

export const getHelpers = (ctx: GetServicesContext) => {
    return {
        shelf: getShelfHelperServices(ctx),
        assortment: getAssortmentHelperServices(ctx),
    };
};

