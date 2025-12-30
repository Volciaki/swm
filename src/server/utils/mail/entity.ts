import { Email } from "@/server/modules/identity/domain/entities/Email";

export class EmailMessage {
    private constructor(
        private readonly _to: Email,
        private readonly _subject: string,
        private readonly _html: string,
        // Fallback if HTML isn't supported.
        private readonly _text: string,
    ) {}

    static create(to: Email, subject: string, html: string, text: string) {
        return new EmailMessage(to, subject, html, text);
    }

    get to() { return this._to };
    get subject() { return this._subject };
    get html() { return this._html };
    get text() { return this._text };
}
