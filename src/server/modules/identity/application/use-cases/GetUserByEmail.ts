import type { UserRepository } from "../../domain/repositories/UserRepository";
import { UserMapper } from "../../infrastructure/mappers/UserMapper";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import type { GetUserByEmailDTO } from "../dto/GetUserByEmailDTO";
import { Email } from "../../domain/entities/Email";

export class GetUserByEmail {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: GetUserByEmailDTO) {
		const userEmail = Email.fromString(dto.email);
		const user = await this.userRepository.getByEmail(userEmail);

		if (!user) throw new UserNotFoundError({ fieldName: "mail", value: dto.email });

		return UserMapper.fromUserToPublicUserDTO(user);
	}
}
