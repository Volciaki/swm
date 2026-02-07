import type { GetServicesContext } from "../../context";
import { getConstantShelfScale } from "./Constant";

export const getShelfScaleServices = (ctx: GetServicesContext) => {
	return {
		random: getConstantShelfScale(ctx),
	};
};
