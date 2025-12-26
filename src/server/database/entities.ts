import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBTwoFactorAuthenticationSession } from "../modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";

export const entities = [DBUser, DBTwoFactorAuthenticationSession];
