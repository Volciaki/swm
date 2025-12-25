import { UUID } from "@/server/utils";
import { User } from "./User";

export class TwoFactorAuthenticationSession {
    private constructor(
        private _id: UUID,
        private _value: string,
        private _user: User,
    ) {}

    static create(id: UUID, value: string, user: User) {
        return new TwoFactorAuthenticationSession(id, value, user);
    }

    get id() { return this._id };
    get value() { return this._value };
    get user() { return this._user };
}
