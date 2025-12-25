import { UUIDManager } from "@/server/utils";
import { Email } from "../../domain/entities/Email";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { StringHasher } from "../services/StringHasher";

export class CreateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly stringHasher: StringHasher,
        private readonly uuidManager: UUIDManager,
    ) {}

    async execute(dto: CreateUserDTO): Promise<User> {
        const user = User.create(
            Email.fromString(dto.email),
            this.stringHasher.hash(dto.passwordRaw),
            this.uuidManager.generate(),
            dto.name,
            dto.isAdmin,
        );
        await this.userRepository.create(user);
        return user;
    }
}
