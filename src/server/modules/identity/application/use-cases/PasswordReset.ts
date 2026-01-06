import { UserDTO, UUID } from "@/server/utils";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordResetDTO } from "../dto/PasswordResetDTO";
import { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { TwoFactorAuthenticationSessionNotFoundError } from "../errors/TwoFactorAuthenticationSessionNotFoundError";
import { WrongTwoFactorAuthenticationValueError } from "../../domain/errors/WrongTwoFactorAuthenticationValue";
import { InvalidTwoFactorAuthenticationSessionError } from "../errors/InvalidTwoFactorAuthenticationSessionError";
import { StringHasher } from "../services/StringHasher";

export class PasswordReset {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly twoFactorAuthenticationSessionRepository: TwoFactorAuthenticationSessionRepository,
        private readonly stringHasher: StringHasher,
    ) {}

    async execute(dto: PasswordResetDTO, currentUser?: UserDTO) {
        if (currentUser) throw new AlreadyLoggedInError();

        const sessionId = UUID.fromString(dto.authenticationId);
        const session = await this.twoFactorAuthenticationSessionRepository.getById(sessionId);

        if (!session) throw new TwoFactorAuthenticationSessionNotFoundError(dto.authenticationId);

        if (session.value !== dto.authenticationValue) throw new WrongTwoFactorAuthenticationValueError(dto.authenticationValue);

        const user = await this.userRepository.getById(session.userId);
        
        if (!user) throw new InvalidTwoFactorAuthenticationSessionError(session.id.value, session.userId.value);

        const newPasswordHash = await this.stringHasher.hash(dto.newPasswordRaw);
        user.passwordHash = newPasswordHash;

        await this.userRepository.update(user);
    }
}
