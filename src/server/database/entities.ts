import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBTwoFactorAuthenticationSession } from "../modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";
import { DBShelf } from "../modules/warehouse/infrastructure/entities/DBShelf";
import { DBCell } from "../modules/warehouse/infrastructure/entities/DBCell";

export const entities = [DBUser, DBTwoFactorAuthenticationSession, DBShelf, DBCell];
