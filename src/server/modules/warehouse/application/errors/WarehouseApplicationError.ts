export class WarehouseApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IdentityApplicationError";
    }
}
