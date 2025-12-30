import { UUID, UUIDManager } from "@/server/utils";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { RequestPasswordResetDTO } from "../dto/RequestPasswordResetDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { TwoFactorAuthenticationValueGenerator } from "../services/TwoFactorAuthenticationValueGenerator";
import { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { TwoFactorAuthenticationValueSender } from "../services/TwoFactorAuthenticationValueSender";

export class RequestPasswordReset {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly twoFactorAuthenticationSessionRepository: TwoFactorAuthenticationSessionRepository,
        private readonly uuidManager: UUIDManager,
        private readonly twoFactorAuthenticationValueGenerator: TwoFactorAuthenticationValueGenerator,
        private readonly twoFactorAuthenticationValueSender?: TwoFactorAuthenticationValueSender,
    ) {}

    async execute(dto: RequestPasswordResetDTO, currentUser?: User) {
        if (currentUser) throw new AlreadyLoggedInError();

        const userId = UUID.fromString(dto.userId);
        const user = await this.userRepository.getById(userId);

        if (!user) throw new UserNotFoundError("UUID", dto.userId);

        const twoFactorAuthenticationValue = this.twoFactorAuthenticationValueGenerator.generate();
        const authenticationSession = await this.twoFactorAuthenticationSessionRepository.setupForUser(
            user,
            this.uuidManager.generate(),
            twoFactorAuthenticationValue,
        );

        if (this.twoFactorAuthenticationValueSender)
            await this.twoFactorAuthenticationValueSender.deliverToUser(user, authenticationSession);

        return { authenticationId: authenticationSession.id.value };
    }
}
