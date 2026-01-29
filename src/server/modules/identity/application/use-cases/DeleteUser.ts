import type { UserDTO } from "@/server/utils";
import { UnauthorizedError, UUID } from "@/server/utils";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { DeleteUserDTO } from "../dto/DeleteUserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export class DeleteUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: DeleteUserDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const userId = UUID.fromString(dto.id);
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError({ fieldName: "UUID", value: "dto.id" });

		await this.userRepository.delete(user);
	}
}
