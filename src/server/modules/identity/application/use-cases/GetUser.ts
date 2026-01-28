import { UUID } from "@/server/utils";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";
import type { GetUserDTO } from "../dto/GetUserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export class GetUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: GetUserDTO) {
		const userId = UUID.fromString(dto.id);
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError({ fieldName: "UUID", value: dto.id });

		return UserMapper.fromUserToPublicUserDTO(user);
	}
}
