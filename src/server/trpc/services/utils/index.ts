import { GetServicesContext } from "../context";
import { getStringHasherServices } from "./StringHasher";
import { getUUIDManagerServices } from "./UUIDManager";
import { getAuthenticationManagerServices } from "./AuthenticationManager";
import { getTwoFactorAuthenticationValueGeneratorServices } from "./TwoFactorAuthenticationValueGenerator";

export const getUtils = (ctx: GetServicesContext) => {
    return {
        stringHasher: getStringHasherServices(ctx),
        uuidManager: getUUIDManagerServices(ctx),
        authenticationManager: getAuthenticationManagerServices(ctx),
        twoFactorAuthenticationValueGenerator: getTwoFactorAuthenticationValueGeneratorServices(ctx),
    };
};
