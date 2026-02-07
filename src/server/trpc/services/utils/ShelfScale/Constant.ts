import { ConstantShelfScale } from "@/server/modules/warehouse/infrastructure/services/ConstantShelfScale";
import type { GetServicesContext } from "../../context";

export const getConstantShelfScale = (ctx: GetServicesContext): ConstantShelfScale => {
	return new ConstantShelfScale();
};
