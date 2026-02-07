import type { GetServicesContext } from "../context";

import { getStringHasherServices } from "./StringHasher";
import { getUUIDManagerServices } from "./UUIDManager";
import { getAuthenticationManagerServices } from "./AuthenticationManager";
import { getTwoFactorAuthenticationValueGeneratorServices } from "./TwoFactorAuthenticationValueGenerator";
import { getTwoFactorAuthenticationValueSenderServices } from "./TwoFactorAuthenticationValueSender";
import { getEmailManagerServices } from "./EmailManager";
import { getFileStorageServices } from "./FileStorage";
import { getQRCodeGeneratorServices } from "./QRCodeGenerator";
import { getFileManagerServices } from "./FileManager";
import { getShelfThermometerServices } from "./ShelfThermometer";
import { getCloseToExpirationAssortmentReportGeneratorServices } from "./CloseToExpirationAssortmentReportGenerator";
import { getFullStorageShowcaseReportGeneratorServices } from "./FullStorageShowcaseReportGenerator";
import { getTemperatureExceededDetailsReportGeneratorServices } from "./TemperatureExceededDetailsReportGenerator";
import { getFileStorageDataManagerServices } from "./FileStorageDataManager";
import { getDatabaseDataManagerServices } from "./DatabaseDataManager";
import { getEncryptionManagerServices } from "./EncryptionManager";
import { getAssortmentDefinitionUtilitiesServices } from "./AssortmentDefinitionUtilities";
import { getFIFOQueueManagerServices } from "./FIFOQueueManager";
import { getShelfScaleServices } from "./ShelfScale";

export const getUtils = (ctx: GetServicesContext) => {
	return {
		stringHasher: getStringHasherServices(ctx),
		uuidManager: getUUIDManagerServices(ctx),
		authenticationManager: getAuthenticationManagerServices(ctx),
		twoFactorAuthenticationValueGenerator: getTwoFactorAuthenticationValueGeneratorServices(ctx),
		twoFactorAuthenticationValueSender: getTwoFactorAuthenticationValueSenderServices(ctx),
		emailManager: getEmailManagerServices(ctx),
		fileStorage: getFileStorageServices(ctx),
		qrCodeGenerator: getQRCodeGeneratorServices(ctx),
		fileManager: getFileManagerServices(ctx),
		shelfThermometer: getShelfThermometerServices(ctx),
		closeToExpirationAssortmentReportGenerator: getCloseToExpirationAssortmentReportGeneratorServices(ctx),
		fullStorageShowcaseReportGenerator: getFullStorageShowcaseReportGeneratorServices(ctx),
		temperatureExceededDetailsReportGenerator: getTemperatureExceededDetailsReportGeneratorServices(ctx),
		fileStorageDataManager: getFileStorageDataManagerServices(ctx),
		databaseDataManager: getDatabaseDataManagerServices(ctx),
		encryptionManager: getEncryptionManagerServices(ctx),
		assortmentDefinition: getAssortmentDefinitionUtilitiesServices(ctx),
		fifoQueueManager: getFIFOQueueManagerServices(ctx),
		shelfScale: getShelfScaleServices(ctx),
	};
};
