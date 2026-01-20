import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBTwoFactorAuthenticationSession } from "../modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";
import { DBShelf } from "../modules/warehouse/infrastructure/entities/DBShelf";
import { DBCell } from "../modules/warehouse/infrastructure/entities/DBCell";
import { DBAssortment } from "../modules/assortment/infrastructure/entities/DBAssortment";
import { DBFileReference } from "../utils/files/infrastructure/entities/DBFileReference";
import { DBNotification } from "../modules/monitoring/infrastructure/entities/DBNotification";
import { DBTemperatureReading } from "../modules/warehouse/infrastructure/entities/DBTemperatureReading";
import { DBReport } from "../modules/reporting/infrastructure/entities/DBReport";

export const entities = [
	DBUser,
	DBTwoFactorAuthenticationSession,
	DBShelf,
	DBCell,
	DBAssortment,
	DBFileReference,
	DBNotification,
	DBTemperatureReading,
	DBReport,
];
