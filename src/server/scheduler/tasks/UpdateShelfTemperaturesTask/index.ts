import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultUpdateShelfTemperaturesPreset } from "./Default";

export const getUpdateShelfTemperaturesPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultUpdateShelfTemperaturesPreset(ctx),
	};
};
