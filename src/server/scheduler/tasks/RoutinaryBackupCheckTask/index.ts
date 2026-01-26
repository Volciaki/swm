import type { GetServicesContext } from "@/server/trpc/services/context";
import { getDefaultRoutinaryBackupCheck } from "./Default";

export const getRoutinaryBackupCheckPresets = (ctx: GetServicesContext) => {
	return {
		default: getDefaultRoutinaryBackupCheck(ctx),
	};
};
