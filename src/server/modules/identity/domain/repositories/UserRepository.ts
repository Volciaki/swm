import type { UUID } from "@/server/utils";
import type { User } from "../entities/User";
import type { Email } from "../entities/Email";

export interface UserRepository {
	create(user: User): Promise<void>;
	update(user: User): Promise<void>;
	delete(user: User): Promise<void>;
	getAll(): Promise<User[]>;
	getById(id: UUID): Promise<User | null>;
	getByEmail(email: Email): Promise<User | null>;
}
