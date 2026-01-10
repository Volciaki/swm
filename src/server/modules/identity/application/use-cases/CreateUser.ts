import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UUIDManager } from "@/server/utils";
import { Email } from "../../domain/entities/Email";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { StringHasher } from "../services/StringHasher";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";

export class CreateUser {
	constructor(
        private readonly userRepository: UserRepository,
        private readonly stringHasher: StringHasher,
        private readonly uuidManager: UUIDManager,
	) {}

	async execute(dto: CreateUserDTO, currentUser?: User) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const user = User.create(
			Email.fromString(dto.email),
			await this.stringHasher.hash(dto.passwordRaw),
			this.uuidManager.generate(),
			dto.name,
			dto.isAdmin,
			dto.twoFactorAuthenticationEnabled,
		);
		await this.userRepository.create(user);
		return UserMapper.fromUserToUserDTO(user);
	}
}
