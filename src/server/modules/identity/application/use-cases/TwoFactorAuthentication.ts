import { UUID } from "@/server/utils";
import { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { WrongTwoFactorAuthenticationValueError } from "../../domain/errors/WrongTwoFactorAuthenticationValue";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { InvalidTwoFactorAuthenticationSessionError } from "../errors/InvalidTwoFactorAuthenticationSessionError";
import { TwoFactorAuthenticationDTO } from "../dto/TwoFactorAuthenticationDTO";
import { AuthenticationManager } from "../services/AuthenticationManager";
import { TwoFactorAuthenticationSessionNotFoundError } from "../errors/TwoFactorAuthenticationSessionNotFoundError";

export class TwoFactorAuthentication {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly twoFactorAuthenticationSessionRepository: TwoFactorAuthenticationSessionRepository,
        private readonly authenticationManager: AuthenticationManager,
    ) {}

    async execute(dto: TwoFactorAuthenticationDTO, currentUser?: User) {
        if (currentUser) throw new AlreadyLoggedInError();

        const authenticationID = UUID.fromString(dto.authenticationId);
        const authentication = await this.twoFactorAuthenticationSessionRepository.getById(authenticationID);

        if (!authentication) throw new TwoFactorAuthenticationSessionNotFoundError(dto.authenticationId);

        if (dto.value !== authentication.value) throw new WrongTwoFactorAuthenticationValueError(dto.value);

        const user = await this.userRepository.getById(authentication.userId);

        if (!user) throw new InvalidTwoFactorAuthenticationSessionError(authentication.id.value, authentication.userId.value);

        await this.twoFactorAuthenticationSessionRepository.delete(authentication);

        return {
            authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(user)
        };
    }
}
