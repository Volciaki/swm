import { BaseError, ErrorName } from "@/server/utils";

export class UnauthorizedError extends BaseError<ErrorName.UNAUTHORIZED> {
	constructor() {
		super({
			error: {
				code: "NOT_FOUND",
				message: "You're lacking permissions to perform this action.",
			},
			metadata: {
				name: ErrorName.UNAUTHORIZED,
				value: null,
			},
		});
	}
}
