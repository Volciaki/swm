import { UUID } from "@/server/utils";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import type { GetUserByIdDTO } from "../dto/GetUserByIdDTO";

export class GetUserById {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: GetUserByIdDTO) {
		const userId = UUID.fromString(dto.id);
		const user = await this.userRepository.getById(userId);

		if (!user) throw new UserNotFoundError({ fieldName: "UUID", value: dto.id });

		return UserMapper.fromUserToPublicUserDTO(user);
	}
}
