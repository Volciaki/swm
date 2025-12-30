import { Email } from "@/server/modules/identity/domain/entities/Email";

export class EmailMessage {
    private constructor(
        private readonly _to: Email,
        private readonly _subject: string,
        private readonly _body: string,
    ) {}

    static create(to: Email, subject: string, body: string) {
        return new EmailMessage(to, subject, body);
    }

    get to() { return this._to };
    get subject() { return this._subject };
    get body() { return this._body };
}
