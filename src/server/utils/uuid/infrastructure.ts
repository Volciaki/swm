import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "./entity";
import type { UUIDManager } from "./service";

export class DefaultUUIDManager implements UUIDManager {
	generate(): UUID {
		const uuid = uuidv4();
		return UUID.fromString(uuid);
	}

	validate(value: string): boolean {
		const uuidSchema = z.uuidv4();
		const result = uuidSchema.safeParse(value);
		return result.success;
	}
}
