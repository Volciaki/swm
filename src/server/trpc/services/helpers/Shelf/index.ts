import { GetServicesContext } from "../../context";
import { getDefaultShelfHelper } from "./Default";

export const getShelfHelperServices = (ctx: GetServicesContext) => {
    return {
        default: getDefaultShelfHelper(ctx),
    };
};
