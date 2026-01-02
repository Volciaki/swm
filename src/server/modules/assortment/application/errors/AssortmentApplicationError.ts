export class AssortmentApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AssortmentApplicationError";
    }
}
