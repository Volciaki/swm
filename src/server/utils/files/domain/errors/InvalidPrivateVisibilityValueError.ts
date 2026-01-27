import { ErrorName } from "@/server/utils/errors";
import { FilesDomainError } from "./FilesDomainError";

export class InvalidPrivateVisibilityValueError extends FilesDomainError<ErrorName.INVALID_PRIVATE_VISIBILITY_VALUE> {
	constructor() {
		super({
			error: {
				code: "BAD_REQUEST",
				message: "Private Visibility can't have a `publicUrl` assigned!",
			},
			metadata: {
				name: ErrorName.INVALID_PRIVATE_VISIBILITY_VALUE,
				value: null,
			},
		});
	}
}
