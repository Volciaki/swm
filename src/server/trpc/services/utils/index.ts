import { GetServicesContext } from "../context";
import { getStringHasherServices } from "./StringHasher";
import { getUUIDManagerServices } from "./UUIDManager";
import { getAuthenticationManagerServices } from "./AuthenticationManager";
import { getTwoFactorAuthenticationValueManagerServices } from "./TwoFactorAuthenticationValueManager";

export const getUtils = (ctx: GetServicesContext) => {
	return {
		stringHasher: getStringHasherServices(ctx),
		uuidManager: getUUIDManagerServices(ctx),
		authenticationManager: getAuthenticationManagerServices(ctx),
		twoFactorAuthenticationValueManager: getTwoFactorAuthenticationValueManagerServices(ctx),
	};
};
