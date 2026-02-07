import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultUpdateShelfWeightsPreset } from "./Default";

export const getUpdateShelfWeightsPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultUpdateShelfWeightsPreset(ctx),
	};
};
