import { DefaultEncryptionManager } from "@/server/utils/files/infrastructure/services/DefaultEncryptionManager";
import type { GetServicesContext } from "../../context";

export const getDefaultEncryptionManager = (ctx: GetServicesContext): DefaultEncryptionManager => {
	return new DefaultEncryptionManager();
};
