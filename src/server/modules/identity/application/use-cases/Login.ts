import { UUIDManager } from "@/server/utils";
import { Email } from "../../domain/entities/Email";
import { User } from "../../domain/entities/User";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { WrongPasswordError } from "../../domain/errors/WrongPasswordError";
import { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { LoginDTO } from "../dto/LoginDTO";
import { LoginResponseDTO } from "../dto/LoginResponseDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { AuthenticationManager } from "../services/AuthenticationManager";
import { StringHasher } from "../services/StringHasher";
import { TwoFactorAuthenticationValueManager } from "../services/TwoFactorAuthenticationValueManager";

export class Login {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly twoFactorAuthenticationSessionRepository: TwoFactorAuthenticationSessionRepository,
        private readonly stringHasher: StringHasher,
        private readonly authenticationManager: AuthenticationManager,
        private readonly uuidManager: UUIDManager,
        private readonly twoFactorAuthenticationValueManager: TwoFactorAuthenticationValueManager,
    ) {}

    async execute(dto: LoginDTO, currentUser?: User): Promise<LoginResponseDTO> {
        if (currentUser) throw new AlreadyLoggedInError();

        const email = Email.fromString(dto.email);
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new UserNotFoundError("mail", dto.email);

        const passwordMatches = await this.stringHasher.verify(dto.passwordRaw, user.passwordHash);
        if (!passwordMatches) throw new WrongPasswordError(dto.passwordRaw, dto.email);

        if (user.twoFactorAuthenticationEnabled) {
            const authenticationSession = await this.twoFactorAuthenticationSessionRepository.setupForUser(
                user,
                this.uuidManager.generate(),
                this.twoFactorAuthenticationValueManager.generate(),
            );
            return { authenticationId: authenticationSession.id.value };
        }

        return {
            authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(user)
        };
    }
}
