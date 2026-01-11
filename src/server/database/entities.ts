import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBTwoFactorAuthenticationSession } from "../modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";
import { DBShelf } from "../modules/warehouse/infrastructure/entities/DBShelf";
import { DBCell } from "../modules/warehouse/infrastructure/entities/DBCell";
import { DBAssortment } from "../modules/assortment/infrastructure/entities/DBAssortment";
import { DBFileReference } from "../utils/files/infrastructure/entities/DBFileReference";

export const entities = [
	DBUser,
	DBTwoFactorAuthenticationSession,
	DBShelf,
	DBCell,
	DBAssortment,
	DBFileReference,
];
