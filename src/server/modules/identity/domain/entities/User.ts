import type { UUID } from "@/server/utils";
import type { Email } from "./Email";

export class User {
	private constructor(
		private _email: Email,
		private _passwordHash: string,
		private _id: UUID,
		private _name: string,
		private _isAdmin: boolean,
		private _twoFactorAuthenticationEnabled: boolean
	) {}

	static create(
		email: Email,
		passwordHash: string,
		id: UUID,
		name: string,
		isAdmin: boolean,
		twoFactorAuthenticationEnabled: boolean
	) {
		return new User(email, passwordHash, id, name, isAdmin, twoFactorAuthenticationEnabled);
	}

	get isAdmin() {
		return this._isAdmin;
	}
	get passwordHash() {
		return this._passwordHash;
	}
	get twoFactorAuthenticationEnabled() {
		return this._twoFactorAuthenticationEnabled;
	}
	get email() {
		return this._email;
	}
	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}

	set passwordHash(value: string) {
		this._passwordHash = value;
	}

	set isAdmin(value: boolean) {
		this._isAdmin = value;
	}

	set twoFactorAuthenticationEnabled(value: boolean) {
		this._twoFactorAuthenticationEnabled = value;
	}

	set email(value: Email) {
		this._email = value;
	}

	set name(value: string) {
		this._name = value;
	}
}
