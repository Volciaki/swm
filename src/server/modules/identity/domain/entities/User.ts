import { UUID } from "@/server/utils";
import { Email } from "./Email";

export class User {
    private constructor(
        private _email: Email,
        private _passwordHash: string,
        private _id: UUID,
        private _name: string,
        private _isAdmin: boolean,
    ) {}

    static create(
        email: Email,
        passwordHash: string,
        id: UUID,
        name: string,
        isAdmin: boolean,
    ) {
        return new User(email, passwordHash, id, name, isAdmin);
    }
}
