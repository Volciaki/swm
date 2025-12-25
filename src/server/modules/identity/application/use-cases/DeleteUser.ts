import { UUID } from "@/server/utils";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { DeleteUserDTO } from "../dto/DeleteUserDTO";

export class DeleteUser {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: DeleteUserDTO) {
        const userId = UUID.fromString(dto.id);
        const user = await this.userRepository.getById(userId);
        await this.userRepository.delete(user);
    }
}
