import type { ErrorMetadataValue } from "@/server/utils/errors";
import { ErrorName } from "@/server/utils/errors";
import { IdentityApplicationError } from "./IdentityApplicationError";

export class UserNotFoundError extends IdentityApplicationError<ErrorName.USER_NOT_FOUND> {
	constructor(value: ErrorMetadataValue[ErrorName.USER_NOT_FOUND]) {
		super({
			error: {
				code: "NOT_FOUND",
				message: `Couldn't find an user with a ${value.fieldName} set to ${value.value}`,
			},
			metadata: {
				name: ErrorName.USER_NOT_FOUND,
				value,
			},
		});
	}
}
