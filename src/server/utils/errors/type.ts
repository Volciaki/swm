export enum ErrorName {
	USER_NOT_FOUND = "UserNotFound",
	ALREADY_LOGGED_IN = "AlreadyLoggedIn",
}

export type FullErrorName = `${ErrorName}Error`;

// prettier-ignore
export type ErrorMetadataValue = {
    [Error in ErrorName]: 
        Error extends ErrorName.USER_NOT_FOUND ? { fieldName: "UUID" | "mail", value: string } :
        Error extends ErrorName.ALREADY_LOGGED_IN ? null :
        never;
};
