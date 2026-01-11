import { GetServicesContext } from "../context";
import { getStringHasherServices } from "./StringHasher";
import { getUUIDManagerServices } from "./UUIDManager";
import { getAuthenticationManagerServices } from "./AuthenticationManager";
import { getTwoFactorAuthenticationValueGeneratorServices } from "./TwoFactorAuthenticationValueGenerator";
import { getTwoFactorAuthenticationValueSenderServices } from "./TwoFactorAuthenticationValueSender";
import { getEmailManagerServices } from "./EmailManager";
import { getFileStorageServices } from "./FileStorage";

export const getUtils = (ctx: GetServicesContext) => {
	return {
		stringHasher: getStringHasherServices(ctx),
		uuidManager: getUUIDManagerServices(ctx),
		authenticationManager: getAuthenticationManagerServices(ctx),
		twoFactorAuthenticationValueGenerator: getTwoFactorAuthenticationValueGeneratorServices(ctx),
		twoFactorAuthenticationValueSender: getTwoFactorAuthenticationValueSenderServices(ctx),
		emailManager: getEmailManagerServices(ctx),
		fileStorage: getFileStorageServices(ctx),
	};
};
