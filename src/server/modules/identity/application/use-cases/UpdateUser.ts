import { UnauthorizedError, UUID, type UserDTO } from "@/server/utils";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";
import type { StringHasher } from "../services/StringHasher";
import { Email } from "../../domain/entities/Email";

export class UpdateUser {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly stringHasher: StringHasher
	) {}

	async execute(dto: UpdateUserDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin && dto.id !== currentUser?.id) throw new UnauthorizedError();

		const userId = UUID.fromString(dto.id);
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError({ fieldName: "UUID", value: dto.id });

		user.passwordHash =
			dto.newData.passwordRaw === "" ? user.passwordHash : await this.stringHasher.hash(dto.newData.passwordRaw);
		user.email = Email.fromString(dto.newData.email);
		user.twoFactorAuthenticationEnabled = dto.newData.twoFactorAuthenticationEnabled;
		user.isAdmin = currentUser.isAdmin ? dto.newData.isAdmin : false;
		user.name = dto.newData.name;

		await this.userRepository.update(user);

		return UserMapper.fromUserToPublicUserDTO(user);
	}
}
