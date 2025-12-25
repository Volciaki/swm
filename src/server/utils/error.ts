export class UtilsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UtilsError";
    }
}
