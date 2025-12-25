import { UserRepository } from "../../domain/repositories/UserRepository";

export class ListUsers {
    constructor(private readonly userRepository: UserRepository) {}

    async execute() {
        return await this.userRepository.getAll();
    }
}
