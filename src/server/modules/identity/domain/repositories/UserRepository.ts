import { UUID } from "@/server/utils";
import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<void>;
    delete(user: User): Promise<void>;
    getAll(): Promise<User[]>;
    getById(id: UUID): Promise<User>;
};
