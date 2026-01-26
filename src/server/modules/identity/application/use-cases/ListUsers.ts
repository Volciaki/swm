import type { UserRepository } from "../../domain/repositories/UserRepository";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";

export class ListUsers {
	constructor(private readonly userRepository: UserRepository) {}

	async execute() {
		const users = await this.userRepository.getAll();
		return users
			.map((user) => UserMapper.fromUserToUserDTO(user))
			.map((user) => ({
				id: user.id,
				isAdmin: user.isAdmin,
				email: user.email,
				name: user.name,
			}));
	}
}
