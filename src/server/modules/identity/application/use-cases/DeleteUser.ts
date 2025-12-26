import { UnauthorizedError } from "@/server/utils/unauthorized/error";
import { UUID } from "@/server/utils";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { DeleteUserDTO } from "../dto/DeleteUserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export class DeleteUser {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: DeleteUserDTO, currentUser?: User) {
        if (!currentUser?.isAdmin) throw new UnauthorizedError();

        const userId = UUID.fromString(dto.id);
        const user = await this.userRepository.getById(userId);

        if (!user) throw new UserNotFoundError("UUID", dto.id);

        await this.userRepository.delete(user);
    }
}
