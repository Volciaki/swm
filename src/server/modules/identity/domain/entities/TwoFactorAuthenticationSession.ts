import { UUID } from "@/server/utils";

export class TwoFactorAuthenticationSession {
	private constructor(
        private _id: UUID,
        private _value: string,
        private _userId: UUID,
	) {}

	static create(id: UUID, value: string, userId: UUID) {
		return new TwoFactorAuthenticationSession(id, value, userId);
	}

	get id() { return this._id };
	get value() { return this._value };
	get userId() { return this._userId };
}
