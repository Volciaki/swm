export enum ErrorName {
	USER_NOT_FOUND = "UserNotFound",
	ALREADY_LOGGED_IN = "AlreadyLoggedIn",
	ASSORTMENT_NOT_FOUND = "AssortmentNotFound",
	UNAUTHORIZED = "Unauthorized",
	INVALID_BACKUP = "InvalidBackup",
	BACKUP_NOT_FOUND = "BackupNotFound",
	NO_BACKUP_UTILITIES = "NoBackupUtilities",
	INVALID_TWO_FACTOR_AUTHENTICATION_SESSION = "InvalidTwoFactorAuthenticationSession",
	TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND = "TwoFactorAuthenticationSessionNotFound",
	INVALID_EMAIL = "InvalidEmail",
	WRONG_PASSWORD = "WrongPassword",
	WRONG_TWO_FACTOR_AUTHENTICATION_VALUE = "WrongTwoFactorAuthenticationValue",
	INVALID_AUTHENTICATION_TOKEN = "InvalidAuthenticationToken",
	INVALID_NOTIFICATION_TYPE_VALUE = "InvalidNotificationTypeValue",
	INVALID_REPORT_TYPE_VALUE = "InvalidReportTypeValue",
	ASSORTMENT_NO_CELL = "AssortmentNoCell",
	ASSORTMENT_NO_SPACE = "AssortmentNoSpace",
	CELL_ALREADY_TAKEN = "CellAlreadyTaken",
	NOT_ENOUGH_SHELVES = "NotEnoughShelves",
	SHELF_NOT_FOUND = "ShelfNotFound",
	SHELF_UNEVEN = "ShelfUneven",
	ASSORTMENT_IS_HAZARDOUS = "AssortmentIsHazardous",
	SHELF_TOO_HOT_FOR_ASSORTMENT = "ShelfTooHotForAssortment",
	SHELF_TOO_COLD_FOR_ASSORTMENT = "ShelfTooColdForAssortment",
	ASSORTMENT_TOO_LONG = "AssortmentTooLong",
	ASSORTMENT_TOO_TALL = "AssortmentTooTall",
	ASSORTMENT_TOO_WIDE = "AssortmentTooWide",
	CELL_NOT_FOUND = "CellNotFound",
	SHELF_FULL = "ShelfFull",
	SHELF_OVERLOADED = "ShelfOverloaded",
	SCHEDULER_AUTHORIZATION = "SchedulerAuthorization",
	SCHEDULER_TASK_NOT_FOUND = "SchedulerTaskNotFound",
	INVALID_BASE_64 = "InvalidBase64",
	NEGATIVE_DISTANCE = "NegativeDistance",
	FILE_NOT_FOUND = "FileNotFound",
	INVALID_PRIVATE_VISIBILITY_VALUE = "InvalidPrivateVisibilityValue",
	INVALID_PUBLIC_VISIBILITY_VALUE = "InvalidPublicVisibilityValue",
	INVALID_STORAGE_TYPE_VALUE = "InvalidStorageTypeValue",
	INVALID_TEMPERATURE_RANGE = "InvalidTemperatureRange",
	INVALID_TIME_FRAME = "InvalidTimeFrame",
	INVALID_UUID = "InvalidUUID",
	NEGATIVE_NUMBER = "NegativeNumber",
	INVALID_TEMPERATURE = "InvalidTemperatureValue",
	NEGATIVE_WEIGHT = "NegativeWeight",
}

export type FullErrorName = `${ErrorName}Error`;

// prettier-ignore
export type ErrorMetadataValue = {
    [Error in ErrorName]: 
        Error extends ErrorName.USER_NOT_FOUND ? { fieldName: "UUID" | "mail", value: string } :
        Error extends ErrorName.ALREADY_LOGGED_IN ? null :
        Error extends ErrorName.ASSORTMENT_NOT_FOUND ? { id: string } :
        Error extends ErrorName.UNAUTHORIZED ? null :
        Error extends ErrorName.INVALID_BACKUP ? null :
        Error extends ErrorName.BACKUP_NOT_FOUND ? { id: string } :
        Error extends ErrorName.NO_BACKUP_UTILITIES ? { binary: string } :
        Error extends ErrorName.INVALID_TWO_FACTOR_AUTHENTICATION_SESSION ? { id: string, userId: string } :
        Error extends ErrorName.TWO_FACTOR_AUTHENTICATION_SESSION_NOT_FOUND ? { id: string } :
        Error extends ErrorName.INVALID_EMAIL ? { email: string } :
        Error extends ErrorName.WRONG_PASSWORD ? { password: string, email: string } :
        Error extends ErrorName.WRONG_TWO_FACTOR_AUTHENTICATION_VALUE ? { value: string } :
        Error extends ErrorName.INVALID_AUTHENTICATION_TOKEN ? { token: string } :
        Error extends ErrorName.INVALID_NOTIFICATION_TYPE_VALUE ? { type: string } :
        Error extends ErrorName.INVALID_REPORT_TYPE_VALUE ? { type: string } :
        Error extends ErrorName.ASSORTMENT_NO_CELL ? { assortmentId: string, cellId: string } :
		// Perhaps it would be better to structure this metadata in another way?
        Error extends ErrorName.ASSORTMENT_NO_SPACE ? { details: string } :
        Error extends ErrorName.CELL_ALREADY_TAKEN ? { id: string } :
        Error extends ErrorName.NOT_ENOUGH_SHELVES ? { minimalAmountOfShelves: number } :
        Error extends ErrorName.SHELF_NOT_FOUND ? { id: string } :
        Error extends ErrorName.SHELF_UNEVEN ? null :
        Error extends ErrorName.ASSORTMENT_IS_HAZARDOUS ? { shelfId: string } :
        Error extends ErrorName.SHELF_TOO_HOT_FOR_ASSORTMENT ? {
			assortmentMaximalTemperatureCelsius: string,
			shelfMinimalTemperatureCelsius: string
		} :
     	Error extends ErrorName.SHELF_TOO_COLD_FOR_ASSORTMENT ? {
			assortmentMinimalTemperatureCelsius: string,
			shelfMaximalTemperatureCelsius: string
		} :
     	Error extends ErrorName.ASSORTMENT_TOO_LONG ? {
			passedLengthMillimeters: string,
			maxLengthMillimeters: string,
		} :
  		Error extends ErrorName.ASSORTMENT_TOO_TALL ? {
			passedHeightMillimeters: string,
			maxHeightMillimeters: string,
		} :
		Error extends ErrorName.ASSORTMENT_TOO_WIDE ? {
			passedWidthMillimeters: string,
			maxWidthMillimeters: string,
		} :
        Error extends ErrorName.CELL_NOT_FOUND ? { id: string } :
        Error extends ErrorName.SHELF_FULL ? { id: string } :
        Error extends ErrorName.SHELF_OVERLOADED ? { id: string, maxWeightKg: string, attemptedWeightKg: string } :
        Error extends ErrorName.SCHEDULER_AUTHORIZATION ? { passedPassphrase: string } :
        Error extends ErrorName.SCHEDULER_TASK_NOT_FOUND ? { name: string, availableTasks: string[] } :
        Error extends ErrorName.INVALID_BASE_64 ? { value: string } :
        Error extends ErrorName.NEGATIVE_DISTANCE ? { value: number } :
        Error extends ErrorName.FILE_NOT_FOUND ? { field: "ID" | "path", value: string } :
        Error extends ErrorName.INVALID_PRIVATE_VISIBILITY_VALUE ? null :
        Error extends ErrorName.INVALID_PUBLIC_VISIBILITY_VALUE ? null :
        Error extends ErrorName.INVALID_STORAGE_TYPE_VALUE ? { type: string } :
        Error extends ErrorName.INVALID_TEMPERATURE_RANGE ? {
			minimalTemperatureCelsius: string,
			maximalTemperatureCelsius: string,
		} :
        Error extends ErrorName.INVALID_TIME_FRAME ? { value: number } :
        Error extends ErrorName.INVALID_UUID ? { value: string } :
        Error extends ErrorName.NEGATIVE_NUMBER ? { value: number } :
        Error extends ErrorName.INVALID_TEMPERATURE ? { celsius: string } :
        Error extends ErrorName.NEGATIVE_WEIGHT ? { grams: number } :
        never;
};
