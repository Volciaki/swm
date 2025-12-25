import { z } from "zod";
import { UUID } from "./entity";
import { UUIDManager } from "./service";

export class DefaultUUIDManager implements UUIDManager {
    generate(): UUID {
        // TODO: ...
        return UUID.fromString("");
    }

    validate(value: string): boolean {
        const uuidSchema = z.uuidv4();
        const result = uuidSchema.safeParse(value);
        return result.success;
    }
}
