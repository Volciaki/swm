import type { UUID } from "./entity";

export interface UUIDManager {
	generate(): UUID;
	validate(value: string): boolean;
}
