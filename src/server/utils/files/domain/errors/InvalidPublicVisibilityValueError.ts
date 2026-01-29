import { ErrorName } from "@/server/utils/errors";
import { FilesDomainError } from "./FilesDomainError";

export class InvalidPublicVisibilityValueError extends FilesDomainError<ErrorName.INVALID_PUBLIC_VISIBILITY_VALUE> {
	constructor() {
		super({
			error: {
				code: "BAD_REQUEST",
				message: "Public Visibility has to have a `publicUrl` assigned!",
			},
			metadata: {
				name: ErrorName.INVALID_PUBLIC_VISIBILITY_VALUE,
				value: null,
			},
		});
	}
}
